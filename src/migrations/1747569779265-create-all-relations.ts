import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAllRelations1747569779265 implements MigrationInterface {
  name = 'CreateAllRelations1747569779265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`people\` CHANGE \`homeworld\` \`homeworldId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_species\` (\`film_id\` int NOT NULL, \`specie_id\` int NOT NULL, INDEX \`IDX_1b4564b7d840b6ad4b6147dcca\` (\`film_id\`), INDEX \`IDX_5247647060283c405ca8583e9d\` (\`specie_id\`), PRIMARY KEY (\`film_id\`, \`specie_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_starships\` (\`film_id\` int NOT NULL, \`starship_id\` int NOT NULL, INDEX \`IDX_444471b3def6a5fd00c6345df3\` (\`film_id\`), INDEX \`IDX_588c9888678faab2635a36b361\` (\`starship_id\`), PRIMARY KEY (\`film_id\`, \`starship_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_vehicles\` (\`film_id\` int NOT NULL, \`vehicle_id\` int NOT NULL, INDEX \`IDX_566192317512e27185cd19c036\` (\`film_id\`), INDEX \`IDX_129d973beec0dc7265ea220bcd\` (\`vehicle_id\`), PRIMARY KEY (\`film_id\`, \`vehicle_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_people\` (\`film_id\` int NOT NULL, \`person_id\` int NOT NULL, INDEX \`IDX_0cd6ac37770697a67055812c12\` (\`film_id\`), INDEX \`IDX_72a4340c5ff845bdeb54a7aea3\` (\`person_id\`), PRIMARY KEY (\`film_id\`, \`person_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`films_planets\` (\`film_id\` int NOT NULL, \`planet_id\` int NOT NULL, INDEX \`IDX_b8a6435392aab3ea47ed974132\` (\`film_id\`), INDEX \`IDX_f0f979a772311cb09e158670e6\` (\`planet_id\`), PRIMARY KEY (\`film_id\`, \`planet_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`people_species\` (\`person_id\` int NOT NULL, \`specie_id\` int NOT NULL, INDEX \`IDX_c99d5fb72d0a151cf1690b3b65\` (\`person_id\`), INDEX \`IDX_7708929d522fa239bc4f6725fb\` (\`specie_id\`), PRIMARY KEY (\`person_id\`, \`specie_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`people_starships\` (\`person_id\` int NOT NULL, \`starship_id\` int NOT NULL, INDEX \`IDX_4b9f9b2f8918252c2130daef39\` (\`person_id\`), INDEX \`IDX_1e6d1bb43813bebe27902c1502\` (\`starship_id\`), PRIMARY KEY (\`person_id\`, \`starship_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`people_vehicles\` (\`person_id\` int NOT NULL, \`vehicle_id\` int NOT NULL, INDEX \`IDX_f4b1c67b5bd3370d000cdbef98\` (\`person_id\`), INDEX \`IDX_90af4f65f12d9e6c3246f8eb7b\` (\`vehicle_id\`), PRIMARY KEY (\`person_id\`, \`vehicle_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` DROP COLUMN \`homeworldId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` ADD \`homeworldId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` ADD CONSTRAINT \`FK_8f79bb098a482fa585da15ef3a6\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_1b4564b7d840b6ad4b6147dcca2\` FOREIGN KEY (\`film_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_species\` ADD CONSTRAINT \`FK_5247647060283c405ca8583e9d0\` FOREIGN KEY (\`specie_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_444471b3def6a5fd00c6345df31\` FOREIGN KEY (\`film_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_starships\` ADD CONSTRAINT \`FK_588c9888678faab2635a36b3614\` FOREIGN KEY (\`starship_id\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_566192317512e27185cd19c0363\` FOREIGN KEY (\`film_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_vehicles\` ADD CONSTRAINT \`FK_129d973beec0dc7265ea220bcd6\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_0cd6ac37770697a67055812c120\` FOREIGN KEY (\`film_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` ADD CONSTRAINT \`FK_72a4340c5ff845bdeb54a7aea32\` FOREIGN KEY (\`person_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_b8a6435392aab3ea47ed974132d\` FOREIGN KEY (\`film_id\`) REFERENCES \`films\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_planets\` ADD CONSTRAINT \`FK_f0f979a772311cb09e158670e62\` FOREIGN KEY (\`planet_id\`) REFERENCES \`planets\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_c99d5fb72d0a151cf1690b3b658\` FOREIGN KEY (\`person_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_species\` ADD CONSTRAINT \`FK_7708929d522fa239bc4f6725fb8\` FOREIGN KEY (\`specie_id\`) REFERENCES \`species\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_4b9f9b2f8918252c2130daef391\` FOREIGN KEY (\`person_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_starships\` ADD CONSTRAINT \`FK_1e6d1bb43813bebe27902c15026\` FOREIGN KEY (\`starship_id\`) REFERENCES \`starships\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_f4b1c67b5bd3370d000cdbef981\` FOREIGN KEY (\`person_id\`) REFERENCES \`people\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_vehicles\` ADD CONSTRAINT \`FK_90af4f65f12d9e6c3246f8eb7b8\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_90af4f65f12d9e6c3246f8eb7b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_vehicles\` DROP FOREIGN KEY \`FK_f4b1c67b5bd3370d000cdbef981\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_1e6d1bb43813bebe27902c15026\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_starships\` DROP FOREIGN KEY \`FK_4b9f9b2f8918252c2130daef391\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_7708929d522fa239bc4f6725fb8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people_species\` DROP FOREIGN KEY \`FK_c99d5fb72d0a151cf1690b3b658\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_f0f979a772311cb09e158670e62\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_planets\` DROP FOREIGN KEY \`FK_b8a6435392aab3ea47ed974132d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_72a4340c5ff845bdeb54a7aea32\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_people\` DROP FOREIGN KEY \`FK_0cd6ac37770697a67055812c120\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_129d973beec0dc7265ea220bcd6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_vehicles\` DROP FOREIGN KEY \`FK_566192317512e27185cd19c0363\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_588c9888678faab2635a36b3614\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_starships\` DROP FOREIGN KEY \`FK_444471b3def6a5fd00c6345df31\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_5247647060283c405ca8583e9d0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`films_species\` DROP FOREIGN KEY \`FK_1b4564b7d840b6ad4b6147dcca2\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` DROP FOREIGN KEY \`FK_8f79bb098a482fa585da15ef3a6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` DROP COLUMN \`homeworldId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`people\` ADD \`homeworldId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_90af4f65f12d9e6c3246f8eb7b\` ON \`people_vehicles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f4b1c67b5bd3370d000cdbef98\` ON \`people_vehicles\``,
    );
    await queryRunner.query(`DROP TABLE \`people_vehicles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_1e6d1bb43813bebe27902c1502\` ON \`people_starships\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4b9f9b2f8918252c2130daef39\` ON \`people_starships\``,
    );
    await queryRunner.query(`DROP TABLE \`people_starships\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_7708929d522fa239bc4f6725fb\` ON \`people_species\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_c99d5fb72d0a151cf1690b3b65\` ON \`people_species\``,
    );
    await queryRunner.query(`DROP TABLE \`people_species\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_f0f979a772311cb09e158670e6\` ON \`films_planets\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b8a6435392aab3ea47ed974132\` ON \`films_planets\``,
    );
    await queryRunner.query(`DROP TABLE \`films_planets\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_72a4340c5ff845bdeb54a7aea3\` ON \`films_people\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_0cd6ac37770697a67055812c12\` ON \`films_people\``,
    );
    await queryRunner.query(`DROP TABLE \`films_people\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_129d973beec0dc7265ea220bcd\` ON \`films_vehicles\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_566192317512e27185cd19c036\` ON \`films_vehicles\``,
    );
    await queryRunner.query(`DROP TABLE \`films_vehicles\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_588c9888678faab2635a36b361\` ON \`films_starships\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_444471b3def6a5fd00c6345df3\` ON \`films_starships\``,
    );
    await queryRunner.query(`DROP TABLE \`films_starships\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5247647060283c405ca8583e9d\` ON \`films_species\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1b4564b7d840b6ad4b6147dcca\` ON \`films_species\``,
    );
    await queryRunner.query(`DROP TABLE \`films_species\``);
    await queryRunner.query(
      `ALTER TABLE \`people\` CHANGE \`homeworldId\` \`homeworld\` varchar(255) NOT NULL`,
    );
  }
}
