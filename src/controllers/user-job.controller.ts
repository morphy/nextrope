import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Job,
} from '../models';
import {UserRepository} from '../repositories';

export class UserJobController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/jobs', {
    responses: {
      '200': {
        description: 'Array of User has many Job',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Job)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Job>,
  ): Promise<Job[]> {
    return this.userRepository.jobs(id).find(filter);
  }

  @post('/users/{id}/jobs', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Job)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {
            title: 'NewJobInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) job: Omit<Job, 'id'>,
  ): Promise<Job> {
    return this.userRepository.jobs(id).create(job);
  }

  @patch('/users/{id}/jobs', {
    responses: {
      '200': {
        description: 'User.Job PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {partial: true}),
        },
      },
    })
    job: Partial<Job>,
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.userRepository.jobs(id).patch(job, where);
  }

  @del('/users/{id}/jobs', {
    responses: {
      '200': {
        description: 'User.Job DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.userRepository.jobs(id).delete(where);
  }
}
