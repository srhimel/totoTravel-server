const { MongoClient } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// ObjectID
const ObjectId = require('mongodb').ObjectId;

// setup mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvzjc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async () => {
    try {
        await client.connect();
        console.log('database is running');
    }
    finally {

    }
}

run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('server is running');
})
