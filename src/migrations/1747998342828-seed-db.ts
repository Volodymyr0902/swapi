import {
    MigrationInterface,
    QueryRunner,
    Repository,
} from "typeorm";
import {SWAPI_API_URL} from "../common/constants";
import {Person} from "../people/entities/person.entity";
import {Specie} from "../species/entities/specie.entity";
import {Planet} from "../planets/entities/planet.entity";
import {Film} from "../films/entities/film.entity";
import {Vehicle} from "../vehicles/entities/vehicle.entity";
import {Starship} from "../starships/entities/starship.entity";
import {ExistingEntity} from "../common/types/existing-entity.type";
import * as process from "node:process";
import {SwapiResourceItem} from "../common/interfaces/swapi-resource-item.interface";
import {SwapiResource} from "../common/interfaces/swapi-resource.interface";


export class SeedDb1747998342828 implements MigrationInterface {
    private queryRunner: QueryRunner;

    public async up(queryRunner: QueryRunner): Promise<void> {
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
        this.queryRunner = queryRunner;

        const swapiData = {}
        const allResources: Record<string, string> = await this.getResources(SWAPI_API_URL)

        for (const resourceName of Object.keys(allResources)) {
            swapiData[resourceName] = await this.getAllItemsOfResource(allResources[resourceName]);
            const repository = this.getRepository(resourceName)
            await this.insertItemsWithoutRelations(swapiData[resourceName], repository)
        }

        console.log(`[INFO] -- ${new Date()} -- Inserted all items to database. Proceeding to add relations.`)

        for (const resourceName of Object.keys(swapiData)) {
            const repository = this.getRepository(resourceName)
            await this.addRelations(swapiData[resourceName], repository)
        }

        console.log(`[INFO] -- ${new Date()} -- Added relations to all items!`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableNames = queryRunner.connection.entityMetadatas.map(meta => meta.tableName);

        console.log(tableNames)
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');

        for (const table of tableNames) {
            await queryRunner.query(`DELETE FROM ${table}`);
        }

        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log(`[INFO] -- ${new Date()} -- Seeded data has been cleared!`)
    }

    //<---------HELPER-METHODS-------->//

    private extractIdFromUrl(url: string): number {
        return Number(url.split('/').filter(Boolean).pop())
    }

    private extractResourceNameFromUrl(url: string): string {
        const filteredUrl = url.split('/').filter(Boolean)
        return filteredUrl[filteredUrl.length - 2]
    }

    private async insertItemsWithoutRelations(items: SwapiResourceItem[],
                                              repository: Repository<ExistingEntity>): Promise<void> {
        for (const item of items) {
            const newItem = repository.create();
            newItem.id = this.extractIdFromUrl(item.url)

            for (const prop of Object.keys(item)) {
                if (!Array.isArray(item[prop])
                    && prop !== 'homeworld'
                    && prop !== 'created'
                    && prop !== 'edited'
                    && prop !== 'url') {
                    newItem[prop] = item[prop];
                }
            }

            await repository.save(newItem);
        }
    }

    private async addRelations(items: SwapiResourceItem[],
                               repository: Repository<ExistingEntity>): Promise<void> {
        for (let item of items) {
            const id = this.extractIdFromUrl(item.url)
            let updateOnItem = await repository.findOneByOrFail({id})

            for (let prop of Object.keys(item)) {
                if (Array.isArray(item[prop]) && item[prop].length > 0) {
                    const relationIds: number[] = item[prop].map(this.extractIdFromUrl)
                    const relationProperty: string = this.extractResourceNameFromUrl(item[prop][0])
                    const relationRepository = this.getRepository(relationProperty)

                    updateOnItem[prop] = await Promise.all(relationIds.map(id =>
                        relationRepository.findOneByOrFail({id})))
                } else if (prop === 'homeworld' && item[prop] != null) {
                    const homeworldId = this.extractIdFromUrl(item[prop])
                    if (!repository.metadata.hasRelationWithPropertyPath('homeworld')) {
                        updateOnItem[prop] = homeworldId
                    } else {
                        const planetRepository = this.getRepository('planets')
                        updateOnItem[prop] = await planetRepository.findOneByOrFail({id: homeworldId})
                    }
                }
            }

            await repository.save(updateOnItem)
        }
    }

    private getRepository<T extends ExistingEntity>(resourceName: string): Repository<T> {
        const manager = this.queryRunner.manager
        switch (resourceName) {
            case 'people':
                return manager.getRepository(Person) as Repository<T>
            case 'films':
                return manager.getRepository(Film) as Repository<T>
            case 'species':
                return manager.getRepository(Specie) as Repository<T>
            case 'vehicles':
                return manager.getRepository(Vehicle) as Repository<T>
            case 'starships':
                return manager.getRepository(Starship) as Repository<T>
            case 'planets':
                return manager.getRepository(Planet) as Repository<T>
            default:
                throw new Error('Failed to get repository!')
        }
    }

    private async getResources<T>(url: string): Promise<T> {
        const resourcesRes = await fetch(url)
        return resourcesRes.json()
    }

    private async getAllItemsOfResource(url: string) {
        const items: SwapiResourceItem[][] = []
        const initialPage: SwapiResource = await this.getResources(url)
        items.push(initialPage.results)

        let nextPageURI = initialPage.next
        while (nextPageURI != null) {
            const nextPage: SwapiResource = await this.getResources(nextPageURI)
            items.push(nextPage.results)
            nextPageURI = nextPage.next
        }

        return items.flat()
    }
}
