import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehiclesTable1746521064207 implements MigrationInterface {
    name = 'CreateVehiclesTable1746521064207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`vehicle_class\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`length\` varchar(255) NOT NULL, \`cost_in_credits\` varchar(255) NOT NULL, \`crew\` varchar(255) NOT NULL, \`passengers\` varchar(255) NOT NULL, \`max_atmosphering_speed\` varchar(255) NOT NULL, \`cargo_capacity\` varchar(255) NOT NULL, \`consumables\` varchar(255) NOT NULL, \`created\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`edited\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`vehicles\``);
    }

}
