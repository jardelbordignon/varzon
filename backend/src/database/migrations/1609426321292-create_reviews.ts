import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createReviews1609426321292 implements MigrationInterface {


  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable( new Table({
      name: 'reviews',
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
          name: 'entityId',
          type: 'integer'
        },
        {
          name: 'entityType',
          type: 'varchar'
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'comment',
          type: 'varchar'
        },
        {
          name: 'rating',
          type: 'float(2,1)'
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP'
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP'
        }
      ],

    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('reviews')
  }
  
}
