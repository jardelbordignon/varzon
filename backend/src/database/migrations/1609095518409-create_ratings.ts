import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRatings1609095518409 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'ratings',
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
          name: 'entityName',
          type: 'varchar'
        },
        {
          name: 'entityId',
          type: 'integer'
        },
        {
          name: 'rating',
          type: 'float(2,1)', 
          // type: decimal,
          // scale: 2,
          // precision: 1,
          // default: 0
        },
        {
          name: 'numReviews',
          type: 'integer',
          default: 0
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ratings')
  }

}
