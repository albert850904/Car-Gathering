import { MongoClient } from "mongodb";

export async function connectDatabaseHelper() {
  // events Database
  const client = await MongoClient.connect(
    "mongodb+srv://albert:a123456@cluster0.ccdmq.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocumentHelper(client, collection, document) {
  const eventsDB = client.db("events");
  // insert 進去的叫做document (events DB 裏面的newsletter collection)
  await eventsDB.collection(collection).insertOne(document);
}

export async function getAllDoucmentsHelper(
  client,
  collection,
  sort,
  filter = {}
) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort) // sort 某特定欄位，-1為descend, +1為ascend
    .toArray();
  return documents;
}
