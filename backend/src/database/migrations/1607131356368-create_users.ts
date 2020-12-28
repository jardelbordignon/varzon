import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1607131356368 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          //unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          //isUnique: true
        },
        {
          name: 'password',
          type: 'varchar'
        },
        {
          name: 'isSeller',
          type: 'boolean',
          default: false
        },
        {
          name: 'isAdmin',
          type: 'boolean',
          default: false
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
    await queryRunner.dropTable('users')
  }

}
