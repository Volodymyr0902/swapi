import {Type} from "class-transformer";
import {IsIn, IsInt} from "class-validator";
import {EXISTING_ENTITIES} from "../../common/constants";

export class CreateImageDto {
    @Type(() => Number)
    @IsInt()
    entityId: number;

    @IsIn(EXISTING_ENTITIES)
    entityName: string

    @Type(() => File)
    file: Express.Multer.File;
}
