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
          precision: 1,
          isNullable: true,
          default: 0
        },
        {
          name: 'numReviews',
          type: 'integer',
          isNullable: true,
          default: 0
        },
        {
          name: 'description',
          type: 'text'
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP' //'now()'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP', //'now()'
          onUpdate: 'CURRENT_TIMESTAMP'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products')
  }

}
