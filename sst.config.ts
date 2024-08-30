import { SSTConfig } from 'sst';
import { API } from './stacks/APIStack';
import { StorageStack } from './stacks/StorageStack';
import { AuthStack } from './stacks/AuthStack';
import { FrontendStack } from './stacks/FrontendStack';

export default {
  config(_input) {
    return {
      name: 'notes',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    // storage stack depends on the API stack
    app.stack(StorageStack).stack(API).stack(AuthStack).stack(FrontendStack);
  },
} satisfies SSTConfig;
