const connection = require('../config/connection');

async function dropAll() {
  const collections = await connection.db.listCollections().toArray();
  return Promise.all(
    collections.map((collection) =>
      connection.db.dropCollection(collection.name)
    )
  );
}
module.exports = { dropAll };
