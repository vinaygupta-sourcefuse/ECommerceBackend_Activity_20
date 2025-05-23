import {inject, Provider} from '@loopback/core';
import {DataSource} from '@loopback/repository';
import * as path from 'path';
const dbmigrate = require('db-migrate');

export class MigrationService {
  constructor(
    @inject('datasources.user')
    private dataSource: DataSource,
  ) {}

  async migrate() {
    const dbm = dbmigrate.getInstance(true, {
      config: path.resolve('./database.json'),
      env: process.env.NODE_ENV || 'dev',
    });
    await dbm.up();
    console.log('Migrations executed successfully');
  }

  async rollback() {
    const dbm = dbmigrate.getInstance(true, {
      config: path.resolve('./database.json'),
      env: process.env.NODE_ENV || 'dev',
    });
    await dbm.down();
    console.log('Migration rollback executed successfully');
  }
}

export class MigrationServiceProvider implements Provider<MigrationService> {
  constructor(
    @inject('datasources.user')
    private dataSource: DataSource,
  ) {}

  value() {
    return new MigrationService(this.dataSource);
  }
}
