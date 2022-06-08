const { MongoClient } = require('mongodb');

async function main() {
  const pw = 'gKFomHZbZ1PQbafx';
  // we'll add code here soon
  const uri = `mongodb+srv://karrierewege:${pw}@cluster0.rlk2goy.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    await createListing(client, {
      name: 'Lovely Loft',
      summary: 'A charming loft in Paris',
      bedrooms: 1,
      bathrooms: 1,
    });

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createListing(client, newListing) {
  const result = await client
    .db('sample_airbnb')
    .collection('listingAndReviews')
    .insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
