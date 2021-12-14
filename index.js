var express = require('express');
const assert = require('assert');
var cors = require('cors');
const mongoClient = require('mongodb').MongoClient;

const {
  MONGO_CONNECTION_STRING,
  DB_NAME,
  COLLECTION_NAME,
} = require('./constants/urls');
const { searchAgg } = require('./queries/search');

var app = express();
app.use(cors());

app.get('/search', (request, response) => {
  const searchTerm = request.query.title;
  let searchList = [];

  mongoClient.connect(
    MONGO_CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (connectErr, client) => {
      assert.equal(null, connectErr);
      const coll = client.db(DB_NAME).collection(COLLECTION_NAME);
      let cursor = await coll.aggregate(searchAgg(searchTerm));
      await cursor.forEach((doc) => searchList.push(doc));

      response.send(searchList);

      client.close();
    }
  );
});

app.listen(8080);
