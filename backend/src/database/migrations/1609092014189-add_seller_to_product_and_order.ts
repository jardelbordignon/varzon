import { MigrationInterface, QueryRunner } from "typeorm";

export class addSellerToProduct1609092014189 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE products ADD COLUMN sellerId int`)
    await queryRunner.query(`ALTER TABLE orders ADD COLUMN sellerId int`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE orders DROP COLUMN sellerId`)
    await queryRunner.query(`ALTER TABLE products DROP COLUMN sellerId`)
  }

}
