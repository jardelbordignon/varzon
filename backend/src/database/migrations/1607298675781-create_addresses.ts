import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAddresses1607298675781 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'addresses',
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
          name: 'fullName',
          type: 'varchar'
        },
        {
          name: 'address',
          type: 'varchar'
        },
        {
          name: 'complement',
          type: 'varchar'
        },
        {
          name: 'neighborhood',
          type: 'varchar'
        },
        {
          name: 'city',
          type: 'varchar'
        },
        {
          name: 'state',
          type: 'varchar'
        },
        {
          name: 'country',
          type: 'varchar'
        },
        {
          name: 'postalCode',
          type: 'varchar'
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
    await queryRunner.dropTable('addresses')
  }
    
}
