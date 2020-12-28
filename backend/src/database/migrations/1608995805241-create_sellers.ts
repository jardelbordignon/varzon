import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class createSellers1608995805241 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'sellers',
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
          name: 'userId',
          type: 'integer'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'url',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'logo',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        }
      ]
    }))

  //   await queryRunner.addColumn('users', new TableColumn({
  //     name: 'sellerId',
  //     type: 'integer',
  //     isNullable: true
  // }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //await queryRunner.dropColumn('users', 'sellerId')
    await queryRunner.dropTable('sellers')
  }

}
