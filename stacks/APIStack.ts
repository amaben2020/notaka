import { StackContext, Api, use, Config } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function API({ stack }: StackContext) {
  const { table } = use(StorageStack);
  const STRIPE_SECRET_KEY = new Config.Secret(stack, 'STRIPE_SECRET_KEY');

  const api = new Api(stack, 'api', {
    defaults: {
      function: {
        bind: [table, STRIPE_SECRET_KEY],
      },
      authorizer: 'iam',
    },
    routes: {
      'POST /notes': 'packages/functions/src/create.main',
      'GET /notes/{userId}/{id}': 'packages/functions/src/get.main',
      'GET /notes': 'packages/functions/src/list.main',
      'PUT /notes/{id}': 'packages/functions/src/update.main',
      'DELETE /notes/{id}': 'packages/functions/src/delete.main',
      'POST /billing': 'packages/functions/src/billing.main',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
