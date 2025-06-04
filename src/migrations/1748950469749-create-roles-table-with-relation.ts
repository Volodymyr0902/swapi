import { MigrationInterface, QueryRunner } from "typeorm";
import {Role} from "../modules/roles/entities/role.entity";
import {User} from "../modules/users/entities/user.entity";
import {ExistingRoles} from "../modules/roles/enums/roles.enum";
import * as bcrypt from 'bcrypt';

export class CreateRolesTableWithRelation1748950469749 implements MigrationInterface {
    name = 'CreateRolesTableWithRelation1748950469749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_roles\` (\`role_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_b23c65e50a758245a33ee35fda\` (\`role_id\`), INDEX \`IDX_87b8888186ca9769c960e92687\` (\`user_id\`), PRIMARY KEY (\`role_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_roles\` ADD CONSTRAINT \`FK_87b8888186ca9769c960e926870\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);

        const userRole: Role = await queryRunner.manager.getRepository(Role).save({name: ExistingRoles.USER});
        const adminRole: Role = await queryRunner.manager.getRepository(Role).save({name: ExistingRoles.ADMIN});

        const salt: string = await bcrypt.genSalt();
        const password: string = await bcrypt.hash('sUpeRSeCrEtP@ssw0rd', salt);
        await queryRunner.manager.getRepository(User).save({username: 'admin', password, roles: [adminRole, userRole]});
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_87b8888186ca9769c960e926870\``);
        await queryRunner.query(`ALTER TABLE \`user_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``);
        await queryRunner.query(`DROP INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`user_roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
