import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshToUsers1749036541479 implements MigrationInterface {
  name = 'AddRefreshToUsers1749036541479';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`refreshToken\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`refreshToken\``,
    );
  }
}
