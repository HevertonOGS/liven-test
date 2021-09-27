import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangePropertyCityColumnAddressTable1632698614430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn("address", "city", new TableColumn({
        name: 'city',
        type: 'varchar',
        isUnique: false,
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.changeColumn("address", "city", new TableColumn({
        name: 'city',
        type: 'varchar',
        isUnique: true,
      }));
    }

}
