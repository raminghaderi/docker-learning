'use strict';

//Mongo
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = 'mongodb://mongo:27017/';

//Express
const express = require('express');
const app = express();
app.use(express.json());

const myobj = { name: "Company Inc", address: "Highway 37" };

function createCollection() {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
    
        var dbo = db.db('dockerTest');
        dbo.createCollection('customers', (err, res) => {
          if (err) throw err;
          console.log("Collection created!");
          db.close();
        });
    });
}

function insertOne() {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db('dockerTest');
        dbo.collection('customers').insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}

app.get('/', (req, res) => {
    res.send('Hey, I\'m running fine');
});

app.get('/create-collection', (req, res) => {
    createCollection();
    res.send('Collection created!');
});

app.post('/store-one', (req, res) => {
    insertOne();
    res.send('Document inserted')
})

app.get('/stored-data', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err;
        var dbo = db.db('dockerTest');
        dbo.collection('customers').findOne({}, (err, result) => {
          if (err) throw err;
          res.send(result.name);
          db.close();
        });
      });
})

const port = process.env.PORT || 3000; //env = environment variable
app.listen(port, () => console.log(`The server is running on port ${port}`));
