import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602741099728 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'images',
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
          name: 'productId',
          type: 'integer'
        },
        {
          name: 'path',
          type: 'varchar'
        }
      ],
      foreignKeys: [
        {
          name: 'fkImageProduct',
          columnNames: ['productId'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images')
  }

}
