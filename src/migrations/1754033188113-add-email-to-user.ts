import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import dotenv from 'dotenv';
import * as process from 'node:process';

export class AddEmailToUser1754033188113 implements MigrationInterface {
  name = 'AddEmailToUser1754033188113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`,
    );
    dotenv.config();
    await queryRunner.manager
      .getRepository(User)
      .update({ username: 'admin' }, { email: process.env.SMTP_USER });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
  }
}
