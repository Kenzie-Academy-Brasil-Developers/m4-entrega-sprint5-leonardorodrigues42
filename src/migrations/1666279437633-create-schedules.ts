import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchedules1666279437633 implements MigrationInterface {
    name = 'createSchedules1666279437633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_af08adcdb26370afe1145e433bd"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "propertyIdId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userIdId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "hour" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_98e2e6f75b2022d80c3eb4e4525" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_98e2e6f75b2022d80c3eb4e4525"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "updatedAt" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "hour" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "propertyId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "propertyIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_af08adcdb26370afe1145e433bd" FOREIGN KEY ("propertyIdId") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
