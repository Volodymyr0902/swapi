import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateImagesTableWithRelations1746715272295
  implements MigrationInterface
{
  name = 'CreateImagesTableWithRelations1746715272295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fileName\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`personId\` int NULL, \`filmId\` int NULL, \`starshipId\` int NULL, \`vehicleId\` int NULL, \`specieId\` int NULL, \`planetId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_662089e42a27a165afcb4e0812d\` FOREIGN KEY (\`personId\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_93aa31698eba7a22fd1cd0c97e3\` FOREIGN KEY (\`filmId\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_cb4c7f81fd22b3ee81abb46d995\` FOREIGN KEY (\`starshipId\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_f8239c66e6363f66f00eb581265\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_95389c66e17e52907724d05bb09\` FOREIGN KEY (\`specieId\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` ADD CONSTRAINT \`FK_827828ca25918647b0dc1c15a93\` FOREIGN KEY (\`planetId\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_827828ca25918647b0dc1c15a93\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_95389c66e17e52907724d05bb09\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_f8239c66e6363f66f00eb581265\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_cb4c7f81fd22b3ee81abb46d995\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_93aa31698eba7a22fd1cd0c97e3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`images\` DROP FOREIGN KEY \`FK_662089e42a27a165afcb4e0812d\``,
    );
    await queryRunner.query(`DROP TABLE \`images\``);
  }
}
