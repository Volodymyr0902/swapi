import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ExistingEntity } from '../types/existing-entity.type';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AppEnvVars } from '../types/env-vars.type';
import { STR_PROPS_TO_IGNORE } from '../enums/orig-api-str-props-to-ignore.enum';
import { Planet } from '../../modules/planets/entities/planet.entity';

@Injectable()
export class RelationsToUrisInterceptor implements NestInterceptor {
  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExistingEntity | ExistingEntity[]> {
    return next.handle().pipe(
      map(
        (
          findManyResult: ExistingEntity | ExistingEntity[],
        ): ExistingEntity | ExistingEntity[] => {
          return Array.isArray(findManyResult)
            ? findManyResult.map((item) => this.mapRelationsForItem(item))
            : this.mapRelationsForItem(findManyResult);
        },
      ),
    );
  }

  private mapRelationsForItem<T extends ExistingEntity>(item: T): T {
    for (const prop of Object.keys(item)) {
      if (Array.isArray(item[prop])) {
        item[prop] = this.mapArrayishRelations<T>(item[prop]);
      } else if (this.isNonEmptyHomeworldRelation(item, prop)) {
        item[prop] = this.mapHomeworldRelation(item[prop]);
      }
    }

    return item;
  }

  private mapArrayishRelations<T extends ExistingEntity>(
    relations: T[],
  ): string[] {
    return relations.map((relation: ExistingEntity) => {
      const tableName: string = this.dataSource.getMetadata(
        relation.constructor,
      ).tableName;
      return this.formURI(tableName, relation.id);
    });
  }

  private mapHomeworldRelation(relation: Planet): string {
    const tableName: string = this.dataSource.getMetadata(
      relation.constructor,
    ).tableName;
    const id: number = relation.id;
    return this.formURI(tableName, id);
  }

  private isNonEmptyHomeworldRelation<T extends ExistingEntity>(
    item: T,
    prop: string,
  ): boolean {
    return (
      prop === STR_PROPS_TO_IGNORE.homeworld &&
      item[prop] != null &&
      typeof item[prop] === 'object'
    );
  }

  private formURI(tableName: string, id: number): string {
    const { protocol, host, port } = this.configService.get<AppEnvVars>('app')!;
    return `${protocol}://${host}:${port}/${tableName}/${id}`;
  }
}
