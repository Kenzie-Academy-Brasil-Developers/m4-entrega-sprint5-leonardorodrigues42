import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchedules1666279150047 implements MigrationInterface {
    name = 'createSchedules1666279150047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "hour" TIMESTAMP NOT NULL, "propertyIdId" uuid, "userIdId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "updatedAt" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_af08adcdb26370afe1145e433bd" FOREIGN KEY ("propertyIdId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_af08adcdb26370afe1145e433bd"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "schedules"`);
    }

}
