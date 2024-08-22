import * as uuid from 'uuid';
import { Table } from 'sst/node/table';
import handler from './../../core/src/handler';
import dynamoDb from './../../core/src/dynamodb';
export const main = handler(async (event) => {
  let data = {
    content: '',
    attachment: '',
  };
  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  console.log(
    'event.requestContext.authorizer?',
    event.requestContext.authorizer
  );

  const params = {
    TableName: Table.Notes.tableName,
    Item: {
      // The attributes of the item to be created
      //id of the user
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId,
      noteId: uuid.v1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
    },
  };
  await dynamoDb.put(params);
  return JSON.stringify(params.Item);
});
