import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysuperduperdatabaseDataSource} from '../datasources';
import {User, UserRelations, Job} from '../models';
import {JobRepository} from './job.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly jobs: HasManyRepositoryFactory<Job, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mysuperduperdatabase') dataSource: MysuperduperdatabaseDataSource, @repository.getter('JobRepository') protected jobRepositoryGetter: Getter<JobRepository>,
  ) {
    super(User, dataSource);
    this.jobs = this.createHasManyRepositoryFactoryFor('jobs', jobRepositoryGetter,);
    this.registerInclusionResolver('jobs', this.jobs.inclusionResolver);
  }
}
