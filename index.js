const express = require('express');
const cors = require('cors');
require('dotenv').config();
// * Database Connect
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// * middle wares
app.use(cors());
app.use(express.json());

// * Database Connect
const uri = process.env.DATABASE_URI;
// console.log('🚀 ~ file: index.js:16 ~ uri', uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

async function run() {
  try {
    // * get projects all data
    const Myprojects = client.db('portfolio').collection('myprojects');

    app.get('/myprojects', async (req, res) => {
      const query = {};
      const cursor = Myprojects.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // * get single project data
    app.get('/myprojects/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Myprojects.findOne(query);
      res.send(result);
    });

    console.log('Database Connect');
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
