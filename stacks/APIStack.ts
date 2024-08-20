import { StackContext, Api, EventBus, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function API({ stack }: StackContext) {
  const { table } = use(StorageStack);
  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      'POST /': 'packages/functions/src/create.main',
      'GET /notes/{userId}/{id}': 'packages/functions/src/get.main',
      'GET /notes': 'packages/functions/src/list.main',
      'PUT /notes/{id}': 'packages/functions/src/update.main',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
