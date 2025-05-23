import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
import { SequelizeCrudRepository } from '@loopback/sequelize';
import {ProductDataSource} from '../datasources';
import {Product, ProductRelations} from '../models';


export class ProductRepository extends SequelizeCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {
  constructor(
    @inject('datasources.product') dataSource: ProductDataSource,
  ) {
    super(Product, dataSource);
  }
}
