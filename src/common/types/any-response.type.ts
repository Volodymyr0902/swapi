import {ExistingEntity} from "./existing-entity.type";
import {StreamableFile} from "@nestjs/common";
import {DeleteResponseDto} from "../dto/deleteResponse.dto";

export type AnyResponse =
    | ExistingEntity
    | ExistingEntity[]
    | DeleteResponseDto
    | StreamableFile;
