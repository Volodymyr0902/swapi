import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import {map, Observable} from 'rxjs';
import {ExistingEntity} from "../types/existing-entity.type";
import {DataSource} from "typeorm";

@Injectable()
export class RelationsToIdsInterceptor implements NestInterceptor {
    constructor(private readonly dataSource: DataSource) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<ExistingEntity[]> {
        return next.handle().pipe(
            map((findManyResult: ExistingEntity[]) =>
                findManyResult.map((item: ExistingEntity) => {
                    for (const itemKey of Object.keys(item)) {
                        if (Array.isArray(item[itemKey])) {
                            item[itemKey] = item[itemKey].map((relation: ExistingEntity) => {
                                const tableName = this.dataSource.getMetadata(relation.constructor).tableName;
                                return `http://localhost:8080/${tableName}/${relation.id}`
                            });
                        } else if (typeof item[itemKey] === 'object' && item[itemKey] != null && 'id' in item[itemKey]) {
                            const tableName = this.dataSource.getMetadata(item[itemKey].constructor).tableName;
                            const id: number  = item[itemKey]['id']

                            item[itemKey] = `http://localhost:8080/${tableName}/${id}`
                        }
                    }

                    return item;
                }))
        )
    }
}
