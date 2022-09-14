var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;

var mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const axios = require("axios");

const url = "mongodb://127.0.0.1:27017"; // connection URL
const client = new MongoClient(url); // mongodb client
const dbName = "locations"; // database name
const collectionName = "gebirge"; // collection name

let description = "";

/**
 * GET Befehl für die Gebirge bearbeiten Seite
 */
router.get("/", function (req, res, next) {
  retrieveAllMountainsfromDB(client, dbName, collectionName, res)
});

// retrieve all elements from the database, and pass the results as input data
// source: https://github.com/aurioldegbelo/geosoft2022/blob/main/lecture%2009/scenario%20as%20a%20docker%20app/routes/search.js
async function retrieveAllMountainsfromDB(client, dbName, collectionName, res) 
{

  await client.connect()
  console.log('Connected successfully to the database')

  const db = client.db(dbName)
  const collection = db.collection(collectionName)

  const cursor =  collection.find({})
  const results = await cursor.toArray(function (err, docs) {
  // pass the results data as input for the edit
  res.render('delete', { title: 'Gebirge bearbeiten', data: docs });

})
}

// Ausgewählte Gebirge löschen
router.post("/deleteOne", function (req, res, next) {

  var id = req.body.id;

  // Überprüft ob Gebirge ausgewält wurde
  if (id == "") {
    res.render("notification", {
      title: "Kein Gebirge ausgewählt!",
    });
  } else {
    deleteMountainsfromDB(req, client, dbName, collectionName, res)
  }
});

// source: https://www.mongodbtutorial.org/mongodb-crud/mongodb-deleteone/
async function deleteMountainsfromDB(req, client, dbName, collectionName, res) {

  await client.connect()
  console.log('Connected successfully to the database')
  
  const db = client.db(dbName)
  const collection = db.collection(collectionName)

  var id = req.body.id;

  const cursor =  collection.find({ _id: ObjectId(id) })
  const results = await cursor.toArray(function (err, docs) {
    if (docs.length >= 1) {
      collection.deleteOne({ _id: ObjectId(id) }, function (err, results) {
      });
      res.render("notification", {
        title: "Gebirge erfolgreich gelöscht!",
      });
    } 
  })
}

module.exports = router;
