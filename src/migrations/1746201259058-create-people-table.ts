import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleTable1746201259058 implements MigrationInterface {
  name = 'CreatePeopleTable1746201259058';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`people\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`birth_year\` varchar(255) NOT NULL, \`eye_color\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`hair_color\` varchar(255) NOT NULL, \`height\` varchar(255) NOT NULL, \`mass\` varchar(255) NOT NULL, \`skin_color\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`people\``);
  }
}
