import {Type} from "class-transformer";
import {IsIn, IsInt} from "class-validator";
import {ApiProperty, ApiSchema} from "@nestjs/swagger";
import {EXISTING_ENTITIES} from "../../common/existing-entities.enum";

@ApiSchema({name: 'CreateImage',
    description: "DTO for Image metadata creation"
})
export class CreateImageDto {
    @ApiProperty({
        description: "The id of another entity this image will refer to.",
        example: "2"
    })
    @Type(() => Number)
    @IsInt()
    entityId: number;

    @ApiProperty({
        description: "The general name of another entity this image will refer to.",
        enum: EXISTING_ENTITIES,
        example: EXISTING_ENTITIES.PERSON
    })
    @IsIn(Object.values(EXISTING_ENTITIES))
    entityName: string

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'The file to upload, only image MIME types.',
        example: 'new-image.jpeg',
    })
    @Type(() => File)
    file: Express.Multer.File;
}
