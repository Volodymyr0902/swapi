import {
  EntityManager,
  MigrationInterface,
  QueryRunner,
  Repository,
} from 'typeorm';
import {
  RESOURCE_NAME_POSITION_FROM_END,
  SWAPI_API_URL,
} from '../common/constants';
import { Person } from '../modules/people/entities/person.entity';
import { Specie } from '../modules/species/entities/specie.entity';
import { Planet } from '../modules/planets/entities/planet.entity';
import { Film } from '../modules/films/entities/film.entity';
import { Vehicle } from '../modules/vehicles/entities/vehicle.entity';
import { Starship } from '../modules/starships/entities/starship.entity';
import { ExistingEntity } from '../common/types/existing-entity.type';
import * as process from 'node:process';
import { SwapiResourceItem } from '../common/interfaces/swapi-resource-item.interface';
import { SwapiResource } from '../common/interfaces/swapi-resource.interface';
import { STR_PROPS_TO_IGNORE } from '../common/enums/orig-api-str-props-to-ignore.enum';
import { RESOURCES_NAMES } from '../common/enums/resources-names.enum';

export class SeedDb1747998342828 implements MigrationInterface {
  private queryRunner: QueryRunner;

  public async up(queryRunner: QueryRunner): Promise<void> {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    this.queryRunner = queryRunner;

    const swapiData: Record<string, SwapiResourceItem[]> = {};
    const allResources: Record<string, string> =
      await this.getResources(SWAPI_API_URL);

    for (const resourceName of Object.keys(allResources)) {
      swapiData[resourceName] = await this.getAllItemsOfResource(
        allResources[resourceName],
      );
      const repository: Repository<ExistingEntity> =
        this.getRepository(resourceName);
      await this.insertItemsWithoutRelations(
        swapiData[resourceName],
        repository,
      );
    }

    console.log(
      `[INFO] -- ${new Date()} -- Inserted all items to database. Proceeding to add relations.`,
    );

    for (const resourceName of Object.keys(swapiData)) {
      const repository: Repository<ExistingEntity> =
        this.getRepository(resourceName);
      await this.addRelations(swapiData[resourceName], repository);
    }

    console.log(`[INFO] -- ${new Date()} -- Added relations to all items!`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableNames: string[] = queryRunner.connection.entityMetadatas.map(
      (meta) => meta.tableName,
    );
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');

    for (const table of tableNames) {
      await queryRunner.query(`DELETE FROM ${table}`);
    }

    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log(`[INFO] -- ${new Date()} -- Seeded data has been cleared!`);
  }

  //<---------HELPER-METHODS-------->//

  private extractIdFromUrl(url: string): number {
    return Number(url.split('/').filter(Boolean).pop());
  }

  private extractResourceNameFromUrl(url: string): string {
    const filteredUrl: string[] = url.split('/').filter(Boolean);
    return filteredUrl[filteredUrl.length - RESOURCE_NAME_POSITION_FROM_END];
  }

  private async insertItemsWithoutRelations(
    items: SwapiResourceItem[],
    repository: Repository<ExistingEntity>,
  ): Promise<void> {
    for (const item of items) {
      let newItem: ExistingEntity = repository.create();
      newItem.id = this.extractIdFromUrl(item.url);
      newItem = this.filterPrimitivePropsForItem(newItem, item);

      await repository.save(newItem);
    }
  }

  private filterPrimitivePropsForItem(
    newItem: ExistingEntity,
    item: SwapiResourceItem,
  ): ExistingEntity {
    for (const prop of Object.keys(item)) {
      if (this.isPropertyPrimitive(item, prop)) {
        newItem[prop] = item[prop];
      }
    }

    return newItem;
  }

  private isPropertyPrimitive(
    item: SwapiResourceItem,
    propertyName: string,
  ): boolean {
    return (
      !Array.isArray(item[propertyName]) &&
      !Object.keys(STR_PROPS_TO_IGNORE).includes(propertyName)
    );
  }

  private async addRelations(
    items: SwapiResourceItem[],
    repository: Repository<ExistingEntity>,
  ): Promise<void> {
    for (const item of items) {
      const itemWithRelations: ExistingEntity =
        await this.assignRelationsToUpdate(item, repository);
      await repository.save(itemWithRelations);
    }
  }

  private async assignRelationsToUpdate(
    origItem: SwapiResourceItem,
    repository: Repository<ExistingEntity>,
  ): Promise<ExistingEntity> {
    const id: number = this.extractIdFromUrl(origItem.url);
    const itemWithoutRelations: ExistingEntity =
      await repository.findOneByOrFail({ id });

    for (const prop of Object.keys(origItem)) {
      if (this.isNonEmptyRelationsArray(origItem[prop])) {
        itemWithoutRelations[prop] = await this.assignArrayishRelations(
          origItem,
          prop,
        );
      } else if (this.isHomeworldRelation(origItem, prop)) {
        itemWithoutRelations[prop] = await this.assignHomeworldRelation(
          origItem,
          prop,
          repository,
        );
      }
    }

    return itemWithoutRelations;
  }

  private async assignArrayishRelations(
    origItem: SwapiResourceItem,
    propertyName: string,
  ): Promise<ExistingEntity[]> {
    const relationIds: number[] = origItem[propertyName].map(
      this.extractIdFromUrl,
    );
    const relationProperty: string = this.extractResourceNameFromUrl(
      origItem[propertyName][0],
    );
    const relationRepository: Repository<ExistingEntity> =
      this.getRepository(relationProperty);

    return Promise.all(
      relationIds.map((id) => relationRepository.findOneByOrFail({ id })),
    );
  }

  private async assignHomeworldRelation(
    origItem: SwapiResourceItem,
    propertyName: string,
    repository: Repository<ExistingEntity>,
  ): Promise<number | ExistingEntity> {
    const homeworldId: number = this.extractIdFromUrl(origItem[propertyName]);

    if (
      !repository.metadata.hasRelationWithPropertyPath(
        STR_PROPS_TO_IGNORE.homeworld,
      )
    ) {
      return homeworldId;
    } else {
      const planetRepository: Repository<ExistingEntity> = this.getRepository(
        RESOURCES_NAMES.PLANETS,
      );
      return planetRepository.findOneByOrFail({ id: homeworldId });
    }
  }

  private isNonEmptyRelationsArray(value: unknown): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  private isHomeworldRelation(
    item: SwapiResourceItem,
    propertyName: string,
  ): boolean {
    return (
      propertyName === STR_PROPS_TO_IGNORE.homeworld &&
      item[propertyName] != null
    );
  }

  private getRepository<T extends ExistingEntity>(
    resourceName: string,
  ): Repository<T> {
    const manager: EntityManager = this.queryRunner.manager;

    switch (resourceName) {
      case RESOURCES_NAMES.PEOPLE:
        return manager.getRepository<T>(Person);
      case RESOURCES_NAMES.FILMS:
        return manager.getRepository<T>(Film);
      case RESOURCES_NAMES.SPECIES:
        return manager.getRepository<T>(Specie);
      case RESOURCES_NAMES.VEHICLES:
        return manager.getRepository<T>(Vehicle);
      case RESOURCES_NAMES.STARSHIPS:
        return manager.getRepository<T>(Starship);
      case RESOURCES_NAMES.PLANETS:
        return manager.getRepository<T>(Planet);
      default:
        throw new Error('Failed to get repository!');
    }
  }

  private async getResources<T>(url: string): Promise<T> {
    const resourcesRes: Response = await fetch(url);
    return resourcesRes.json();
  }

  private async getAllItemsOfResource(
    url: string,
  ): Promise<SwapiResourceItem[]> {
    const items: SwapiResourceItem[][] = [];
    const initialPage: SwapiResource = await this.getResources(url);
    items.push(initialPage.results);

    let nextPageURI: string | null = initialPage.next;
    while (nextPageURI != null) {
      const nextPage: SwapiResource = await this.getResources(nextPageURI);
      items.push(nextPage.results);
      nextPageURI = nextPage.next;
    }

    return items.flat();
  }
}
