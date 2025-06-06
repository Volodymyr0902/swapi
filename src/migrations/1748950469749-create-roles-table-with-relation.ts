import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../modules/roles/entities/role.entity';
import { ExistingRoles } from '../modules/roles/enums/roles.enum';
import * as bcrypt from 'bcrypt';
import {SafeUser} from "../modules/users/types/safe-user.type";

export class CreateRolesTableWithRelation1748950469749
  implements MigrationInterface
{
  name = 'CreateRolesTableWithRelation1748950469749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_roles\` (\`role_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_b23c65e50a758245a33ee35fda\` (\`role_id\`), INDEX \`IDX_87b8888186ca9769c960e92687\` (\`user_id\`), PRIMARY KEY (\`role_id\`, \`user_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_b23c65e50a758245a33ee35fda1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_87b8888186ca9769c960e926870\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    const userRole: Role = await queryRunner.manager
      .getRepository(Role)
      .save({ name: ExistingRoles.USER });
    const adminRole: Role = await queryRunner.manager
      .getRepository(Role)
      .save({ name: ExistingRoles.ADMIN });

    const salt: string = await bcrypt.genSalt();
    const password: string = await bcrypt.hash('sUpeRSeCrEtP@ssw0rd', salt);

    await queryRunner.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      ['admin', password],
    );

    const [user] = await queryRunner.query(
      `SELECT id FROM users WHERE username = ?`,
      ['admin'],
    );
    const userId: number = user.id;

    await queryRunner.query(
      `INSERT INTO users_roles (user_id, role_id) VALUES (?, ?), (?, ?)`,
      [userId, adminRole.id, userId, userRole.id],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_87b8888186ca9769c960e926870\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_b23c65e50a758245a33ee35fda1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_87b8888186ca9769c960e92687\` ON \`user_roles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b23c65e50a758245a33ee35fda\` ON \`user_roles\``,
    );
    await queryRunner.query(`DROP TABLE \`users_roles\``);
    await queryRunner.query(`DROP TABLE \`roles\``);
  }
}
