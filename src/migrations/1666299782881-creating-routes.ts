import { MigrationInterface, QueryRunner } from "typeorm";

export class creatingRoutes1666299782881 implements MigrationInterface {
    name = 'creatingRoutes1666299782881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_2b2211958ef1f0e3c680339100e"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "REL_2b2211958ef1f0e3c680339100"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "addressId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ADD "addressId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "REL_2b2211958ef1f0e3c680339100" UNIQUE ("addressId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_2b2211958ef1f0e3c680339100e" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
