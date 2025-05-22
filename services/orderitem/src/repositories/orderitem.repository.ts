import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {OrderitemDataSource} from '../datasources';
import {Orderitem, OrderitemRelations} from '../models';

export class OrderitemRepository extends DefaultCrudRepository<
  Orderitem,
  typeof Orderitem.prototype.id,
  OrderitemRelations
> {
  constructor(
    @inject('datasources.orderitem') dataSource: OrderitemDataSource,
  ) {
    super(Orderitem, dataSource);
  }
}
