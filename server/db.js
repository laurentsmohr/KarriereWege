const { MongoClient } = require('mongodb');

const dbName = 'sample_airbnb';
const pw = 'gKFomHZbZ1PQbafx';
const uri = `mongodb+srv://karrierewege:${pw}@cluster0.rlk2goy.mongodb.net/?retryWrites=true&w=majority`;

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    // await createListing(client, {
    //   name: 'Lovely Loft',
    //   description: 'simple and nice',
    //   bedrooms: 1,
    //   bathrooms: 1,
    // });
    await findOneListingByName(client, 'Lovely Loft');
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function createListing(client, newListing) {
  const result = await client.db(dbName).collection('listingsAndReviews').insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function createMultipleListings(client, newListings) {
  const results = client.db(dbName).collection('listingsAndReviews').insertMany(newListings);
  console.log(results.insertedIds);
}

async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db(dbName)
    .collection('listingsAndReviews')
    .findOne({ name: nameOfListing });

  result ? console.log(result) : console.log('No listings found');
}
