import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateAddress1632585123804 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'address',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'address',
              type: 'varchar',
            },
            {
              name: 'city',
              type: 'varchar',
              isUnique: true,
            },
            {
              name: 'state',
              type: 'varchar',
            },
            {
              name: 'country',
              type: 'varchar',
            },
            {
              name: 'postal_code',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'user_id',
              type: 'uuid',
              isNullable: true,
            }
          ]
        })
      );

      await queryRunner.createForeignKey('address',
        new TableForeignKey({
          name: 'AddressUser',
          columnNames: ['user_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('address', 'AddressUser');
      await queryRunner.dropTable('address');
    }

}
