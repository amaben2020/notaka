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
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
