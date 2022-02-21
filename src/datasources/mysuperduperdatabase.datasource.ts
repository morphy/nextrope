import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mysuperduperdatabase',
  connector: 'memory',
  localStorage: '',
  file: './data/mysuperduperdatabase.json'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysuperduperdatabaseDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysuperduperdatabase';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysuperduperdatabase', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
