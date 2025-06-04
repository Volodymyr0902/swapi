import {IsString} from "class-validator";
import {ApiProperty, ApiSchema} from "@nestjs/swagger";

@ApiSchema({
    name: 'CreateRole',
    description: 'DTO for role creation'
})
export class CreateRoleDto {
    @ApiProperty(
        {
            example: 'ADMIN',
            description: 'Role name',
        })
    @IsString()
    name: string;
}
