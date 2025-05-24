import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
// import {juggler} from '@loopback/repository';
import { SequelizeDataSource } from '@loopback/sequelize';

export const config = {
  name: 'user',
  connector: 'postgresql',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'demoDB'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class UserDataSource extends SequelizeDataSource
  implements LifeCycleObserver {
  static dataSourceName = 'user';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.user', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
