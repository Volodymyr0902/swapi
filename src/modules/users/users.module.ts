import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {RelationsCompleterService} from "../../common/services/relations-completer.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    providers: [UsersService, RelationsCompleterService],
    exports: [UsersService],
})
export class UsersModule {
}
