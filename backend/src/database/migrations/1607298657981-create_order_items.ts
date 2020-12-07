import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrderItems1607298657981 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'order_items',
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
          name: 'orderId',
          type: 'integer'
        },
        {
          name: 'productId',
          type: 'integer'
        },
        {
          name: 'productName',
          type: 'varchar'
        },
        {
          name: 'productImg',
          type: 'varchar'
        },
        {
          name: 'productPrice',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'qty',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'fkOrderItems',
          columnNames: ['orderId'],
          referencedTableName: 'orders',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_items')
  }
  
}
