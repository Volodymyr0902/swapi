import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpeciesTable1746522994256 implements MigrationInterface {
    name = 'CreateSpeciesTable1746522994256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`species\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`classification\` varchar(255) NOT NULL, \`designation\` varchar(255) NOT NULL, \`average_height\` varchar(255) NOT NULL, \`average_lifespan\` varchar(255) NOT NULL, \`eye_colors\` varchar(255) NOT NULL DEFAULT 'none', \`hair_colors\` varchar(255) NOT NULL DEFAULT 'none', \`skin_colors\` varchar(255) NOT NULL DEFAULT 'none', \`language\` varchar(255) NOT NULL, \`homeworld\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`species\``);
    }

}
