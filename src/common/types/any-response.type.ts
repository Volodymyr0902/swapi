import {ExistingEntity} from "./existing-entity.type";
import {DeleteResult} from "typeorm";
import {StreamableFile} from "@nestjs/common";

export type AnyResponse = ExistingEntity | ExistingEntity[] | DeleteResult | StreamableFile
