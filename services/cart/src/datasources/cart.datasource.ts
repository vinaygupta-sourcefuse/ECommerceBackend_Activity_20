import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
// import {juggler} from '@loopback/repository';
import {SequelizeDataSource} from '@loopback/sequelize'

export const config = {
  name: 'cart',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'testdb' // in case of migration(@loopback/sequelize), database will be choosen from the config and this  will be choosen as default(juggler ORM)
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CartDataSource extends SequelizeDataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cart';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cart', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
