const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URL;


module.exports = {
  getConnection: async (collection_name) => {
    const client = new MongoClient(uri);
    await client.connect();
    const collection = client.db(process.env.MONGODB_DATABASE).collection(collection_name);
    // I would recommend against passing client to callers.
    // Your code establishes a connection to the database on every request, and closes after the request.
    // This is not efficient. A better way is to keep the connection alive, the mongodb driver is able to
    // handle the connection efficiently. To mitigate this issue, you can just return the collection to
    // the caller, and the caller don't need to worry about the client.
    return [collection, client];
  }
}
