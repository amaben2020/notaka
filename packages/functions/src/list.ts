import dynamodb from '@notes/core/dynamodb';
import handler from '@notes/core/handler';
import { Table } from 'sst/node/table';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Notes.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId':
        event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      ':noteId': 'e38b14d0-47aa-11ef-a403-e3a78c55b074',
    },
    Key: {
      userId: '123', // The primary key (partition key) for the item
      noteId: 'e38b14d0-47aa-11ef-a403-e3a78c55b074',
    },
  };
  const data = await dynamodb.get(params);

  return JSON.stringify(data.Item);
});
