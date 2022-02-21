import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysuperduperdatabaseDataSource} from '../datasources';
import {Job, JobRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class JobRepository extends DefaultCrudRepository<
  Job,
  typeof Job.prototype.id,
  JobRelations
> {

  public readonly jobuser: BelongsToAccessor<User, typeof Job.prototype.id>;

  constructor(
    @inject('datasources.mysuperduperdatabase') dataSource: MysuperduperdatabaseDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Job, dataSource);
    this.jobuser = this.createBelongsToAccessorFor('jobuser', userRepositoryGetter,);
    this.registerInclusionResolver('jobuser', this.jobuser.inclusionResolver);
  }
}
