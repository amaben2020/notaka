import { SSTConfig } from 'sst';
import { API } from './stacks/APIStack';
import { StorageStack } from './stacks/StorageStack';

export default {
  config(_input) {
    return {
      name: 'notes',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(API);
    app.stack(StorageStack);
  },
} satisfies SSTConfig;
