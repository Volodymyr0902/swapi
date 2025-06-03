import {ExistingEntity} from "./existing-entity.type";
import {StreamableFile} from "@nestjs/common";
import {GeneralResponseDto} from "../dto/general-response.dto";

export type AnyResponse =
    | ExistingEntity
    | ExistingEntity[]
    | GeneralResponseDto
    | StreamableFile;
