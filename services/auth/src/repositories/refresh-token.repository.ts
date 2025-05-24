import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
import { SequelizeCrudRepository } from '@loopback/sequelize';
import {UserDataSource} from '../datasources';
import {RefreshToken, RefreshTokenRelations} from '../models';

export class RefreshTokenRepository extends SequelizeCrudRepository<
  RefreshToken,
  typeof RefreshToken.prototype.token,
  RefreshTokenRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(RefreshToken, dataSource);
  }
}
