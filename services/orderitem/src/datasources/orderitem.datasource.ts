import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

export const config = {
  name: 'orderitem',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'testdb',
};
 
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class OrderitemDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'orderitem';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.orderitem', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
