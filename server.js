const { MongoClient } = require('mongodb');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//live link: https://tototravel.herokuapp.com/
//middleware
app.use(cors());
app.use(express.json());

// ObjectID
const ObjectId = require('mongodb').ObjectId;

// setup mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xvzjc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const database = client.db("tototravel");
const hotelCollection = database.collection('hotels');

const run = async () => {
    try {
        await client.connect();

        // get api 
        app.get('/hotels', async (req, res) => {
            const query = {};
            const cursor = hotelCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);

        });

        app.get('/hotels/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await hotelCollection.findOne(query);
            res.send(result);
        })

        // post api
        app.post('/hotels', async (req, res) => {
            const data = req.body;
            const result = await hotelCollection.insertOne(data);
            res.json(result);
        })
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
