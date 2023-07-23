
const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

const credentials = 'X509-cert-6720785281131994130.pem'
const client = new MongoClient('mongodb+srv://cluster1.njucxlk.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials,
  serverApi: ServerApiVersion.v1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 3600000

});

async function run() {
  try {
    await client.connect();
    const database = client.db("sample_cities");
    const collection = database.collection("sample_cities");

    await collection.createIndex({ location: "2dsphere" });


    //const cursor = collection.find();
    //for await (let doc of cursor) {
    //  var latitude = parseFloat(doc.lat);
    //  var longitude = parseFloat(doc.lng);
  //
    //  await collection.updateOne(
    //      { _id: doc._id },
    //      {
    //          $set: { location: { type: "Point", coordinates: [longitude, latitude] } }
    //      }
    //  );
    //}
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
