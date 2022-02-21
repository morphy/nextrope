import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Job,
  User,
} from '../models';
import {JobRepository} from '../repositories';

export class JobUserController {
  constructor(
    @repository(JobRepository)
    public jobRepository: JobRepository,
  ) { }

  @get('/jobs/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Job',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Job.prototype.id,
  ): Promise<User> {
    return this.jobRepository.jobuser(id);
  }
}
