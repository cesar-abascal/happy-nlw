import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603251110051 implements MigrationInterface {

public async up(queryRunner: QueryRunner): Promise<void> {
  // Make changes to the database (create table, create new field, delete field, ...)
  await queryRunner.createTable(new Table({
    name: 'orphanages', // Table name
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
        name: 'name',
        type: 'varchar'
      },
      {
        name: 'latitude',
        type: 'decimal',
        scale: 10, // Number of numbers after the comma
        precision: 2 // Number of numbers before the comma
      },
      {
        name: 'longitude',
        type: 'decimal',
        scale: 10,
        precision: 2
      },
      {
        name: 'about',
        type: 'text'
      },
      {
        name: 'instructions',
        type: 'text'
      },
      {
        name: 'opening_hours',
        type: 'varchar'
      },
      {
        name: 'open_on_weekends',
        type: 'boolean',
        default: false
      }
    ]
  }))
}

public async down(queryRunner: QueryRunner): Promise<void> {
  // Undo what was done in the up function
  await queryRunner.dropTable('orphanages');
}

}
