import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createProducts1602732215767 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'category',
          type: 'varchar'
        },
        {
          name: 'price',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'countInStock',
          type: 'integer'
        },
        {
          name: 'brand',
          type: 'varchar'
        },
        {
          name: 'rating',
          type: 'decimal',
          scale: 2,
          precision: 1
        },
        {
          name: 'numReviews',
          type: 'integer'
        },
        {
          name: 'description',
          type: 'text'
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }

}
