import { MongoClient } from 'mongodb'

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://admin:mA!fr94_u7i-bAL@cluster0.gmb6prh.mongodb.net/events?retryWrites=true&w=majority'
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;

}