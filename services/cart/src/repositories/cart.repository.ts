import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CartDataSource} from '../datasources';
import {Cart} from '../models';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id
> {
  constructor(
    @inject('datasources.cart') dataSource: CartDataSource,
  ) {
    super(Cart, dataSource);
  }
}
