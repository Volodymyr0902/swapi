import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {ExistingEntity} from "../types/existing-entity.type";
import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";
import {AppEnvVars} from "../types/env-vars.type";

@Injectable()
export class RelationsToIdsInterceptor implements NestInterceptor {
    constructor(private readonly dataSource: DataSource,
                private readonly configService: ConfigService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<ExistingEntity | ExistingEntity[]> {
        return next.handle().pipe(
            map((findManyResult: ExistingEntity | ExistingEntity[]) => {
                return Array.isArray(findManyResult)
                    ? findManyResult.map(item => this.reduceRelationsForItem(item))
                    : this.reduceRelationsForItem(findManyResult)
            })
        )
    }

    private reduceRelationsForItem(item: ExistingEntity) {
        for (const itemKey of Object.keys(item)) {
            if (Array.isArray(item[itemKey])) {
                item[itemKey] = item[itemKey].map((relation: ExistingEntity) => {
                    const tableName = this.dataSource.getMetadata(relation.constructor).tableName;
                    return this.formURI(tableName, relation.id)
                });
            } else if (typeof item[itemKey] === 'object' && item[itemKey] != null && 'id' in item[itemKey]) {
                const tableName = this.dataSource.getMetadata(item[itemKey].constructor).tableName;
                const id: number = item[itemKey]['id']
                item[itemKey] = this.formURI(tableName, id)
            }
        }

        return item;
    }

    private formURI(tableName: string, id: number) {
        const {protocol, host, port} = this.configService.get<AppEnvVars>('app')!
        return `${protocol}://${host}:${port}/${tableName}/${id}`
    }
}
