import {inject} from '@loopback/core';
// import {DefaultCrudRepository} from '@loopback/repository';
import { SequelizeCrudRepository } from '@loopback/sequelize';
import {UserDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends SequelizeCrudRepository<
  User,
  typeof User.prototype.user_id,
  UserRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(User, dataSource);
  }
}
