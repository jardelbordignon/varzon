import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrders1607298619491 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'orders',
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
          name: 'userId',
          type: 'integer'
        },
        {
          name: 'paymentMethod',
          type: 'varchar'
        },
        {
          name: 'itemsPrice',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'shippingPrice',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'taxPrice',
          type: 'decimal',
          scale: 10,
          precision: 2
        },
        {
          name: 'paidAt',
          type: 'timestamp'
        },
        {
          name: 'deliveredAt',
          type: 'timestamp'
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
      ],

      foreignKeys: [
        {
          name: 'fkUserAddress',
          columnNames: ['userId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
  }
  
}
