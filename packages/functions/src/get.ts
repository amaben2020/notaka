import dynamodb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { Table } from 'sst/node/table';

export const main = handler(async (event) => {
  console.log(event?.pathParameters);
  const params = {
    TableName: Table.Notes.tableName,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: event?.pathParameters?.id,
    },
  };

  const result = await dynamodb.get(params);

  if (!result.Item) throw new Error('Item not found');

  return JSON.stringify(result.Item);
});

// https://zno9t79eof.execute-api.us-east-1.amazonaws.com/notes/123/e38b14d0-47aa-11ef-a403-e3a78c55b074
