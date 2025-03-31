import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTestColumn1743080824089 implements MigrationInterface {
    name = 'AddTestColumn1743080824089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "testColumn" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "testColumn"`);
    }

}
