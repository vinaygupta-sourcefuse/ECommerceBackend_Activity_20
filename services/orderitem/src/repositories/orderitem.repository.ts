import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository'; 
import { SequelizeCrudRepository } from '@loopback/sequelize';
import {OrderitemDataSource} from '../datasources';
import {Orderitem, OrderitemRelations} from '../models';

export class OrderitemRepository extends SequelizeCrudRepository<
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
