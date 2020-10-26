import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603474577877 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images', // Table name
      columns: [ // Table columns
        {
          name: 'id', // Column name
          type: 'integer', // Column type
          unsigned: true, // Only positive numbers
          isPrimary: true, // Primary key
          isGenerated: true, // Generates ids automatically
          generationStrategy: 'increment' // Uses the type of generation by increment
        },
        {
          name: 'path',
          type: 'varchar'
        },
        {
          name: 'orphanage_id', // An orphanage can have many images, and an image belongs to only one orphanage. 1 to N
          type: 'integer'
        }
      ],
      // Creation of the relationship with the foreign key
      foreignKeys: [
        {
          name: 'ImageOrphanage',
          columnNames: ['orphanage_id'], // Name of the column that will store the relationship
          referencedTableName: 'orphanages', // Indicates the table that is related
          referencedColumnNames: ['id'], // Which column in the orphanage table is related
          onUpdate: 'CASCADE', // To automatically change the id within the table so as not to lose the relationship if the orphanage id is changed
          onDelete: 'CASCADE' // To delete the images if the orphanage is deleted
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
