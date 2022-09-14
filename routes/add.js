var express = require("express");
var router = express.Router();
const MongoClient = require("mongodb").MongoClient;

const gjv = require("geojson-validation");
const axios = require("axios");

const url = "mongodb://127.0.0.1:27017"; // connection URL
const client = new MongoClient(url); // mongodb client
// beim hinzufügen mit leaflet draw gibt es schon mal das Problem, dass nach einer Weile keine Koordinaten mehr in die Datenbank hinzugefügt werden. Ist dies der Fall,
// kann es zu Problemen bei der Ansicht auf der "Gebirge bearbeiten" und "Gebirge ansehen" Seite und deren Leaflet Karten kommen. 
// Ist dies der Fall bitte hier und in "show.js", "edit.js" und "routing.js" eine andere Datenbank wählen!
const dbName = "locations"; // database name
const collectionName = "gebirge"; // collection name
let description = "";


/**
 * GET Befehl für die Gebirge hinzufügen Seite
 */
router.get("/", function (req, res, next) {
  res.render("add", { title: "Gebirge hinzufügen" });
});

/**
 * POST Befehl für die durch leafletdraw hinzugefügten Gebirge
 */
router.post("/leafletmarker", function (req, res, next) {

  // Überprüfung auf Korrektheit der Eingaben
  if (req.body.gebirge == "" || req.body.altitude == "" || req.body.long == "" || req.body.lat == "") {
    res.render("notification", {
      title: "Falsche Eingabe! Bitte überarbeiten und noch mal versuchen!",
    });
  } else {

    getWikipediaDescription(req.body.url);

    // Hier wird mit einem Timeout gearbeitet, da erst die Beschreibung da sein soll!
      setTimeout(function () {
      // Definieren des Features
      let gebirge = {
        "type": "Feature",
        "properties": {
          "shape": "Marker",
          "name": req.body.mountain,
          "altitude": req.body.altitude,
          "url": req.body.url,
          "description": description
        },
        "geometry": {
          "type": "Point",
          "coordinates": [req.body.long, req.body.lat]
        },
      };
      
      gebirge.properties.description = description;

      addNewMountaintoDB(client, dbName, collectionName, gebirge, res);
    }, 1500);
  }
});

/**
 * POST Befehl für einen durch das Eingabefeld vom Nutzer hinzugefügtes Gebirge in GeoJSON Format als Text
 */
router.post("/textarea", function (req, res, next) {

  try {
    JSON.parse(req.body.textarea);
  }
  catch (err) {
    res.render("notification", {
      title: "Falsche Eingabe! Bitte nur einzelne Features, keine FeatureCollections!",
    });
  }
  let gebirge = JSON.parse(req.body.textarea);

    getWikipediaDescription(gebirge.properties.url);

    // Hier wird mit Timeout gearbeitet, damit die Beschreibung gegeben ist
    setTimeout(function () {
      gebirge.properties.description = description;

      addNewMountaintoDB(client, dbName, collectionName, gebirge, res);
    }, 1500);
});


/**
 * addNewMountaintoDB
 * @description retrieve all elements from the database, and pass the results as input data
 * @param {*} client 
 * @param {*} dbName 
 * @param {*} collectionName 
 * @param {*} gebirge 
 * @param {*} res 
 * @source: https://github.com/aurioldegbelo/geosoft2022/blob/main/lecture%2008/scenario%20(express%20%2B%20mongodb)/routes/add.js
 */
 function addNewMountaintoDB(client, dbName, collectionName, gebirge, res) 
 {
   client.connect(function (err) {
     console.log("Connected successfully to server");
 
     // abrufen der DB und ihrerer Kollektion
     const db = client.db(dbName);
     const collection = db.collection(collectionName);
 
     // Einfügen in die Datenbank
     collection.insertOne(gebirge) // see https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
     console.log("New Mountain inserted in the database");
     res.render("notification", { title: "Gebirge hinzugefügt!", data: JSON.stringify(gebirge) });
   });
 }

/**
 * @function getWikipediaDescription
 * @desc Checkt ob eine URL eine gültige URL ist und ob es sich um eine Wikipedia URL handelt
 * @param {*} url 
 */
function getWikipediaDescription(url) {
  // Überprüfung auf richtige URL und auf Wikipedia URL
  if (!isValidHttpUrl(url) || url.indexOf("wikipedia") === -1) {
    // wenn nicht
    description = "Kein oder falscher Link, daher keine Beschreibung vorhanden";

  } else {
    // wenn ja
    let urlArray = url.split("/");
    let title = urlArray[urlArray.length - 1];
    
    // mit hilfe von: https://www.youtube.com/watch?v=yqwHxAH1xrw
    axios.get(
      "https://de.wikipedia.org/w/api.php?format=json&exintro=1&action=query&prop=extracts&explaintext=1&exsentences=1&origin=*&titles=" + title
    ).then(function (response) {
      const pageKey = Object.keys(response.data.query.pages)[0];
      description = response.data.query.pages[pageKey].extract;
    });
  }
}


/**
 * @function isValidHttpUrl
 * @desc Überprüft ob ein Javascript String eine gültige URL ist 
 * https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
 * @param {*} string als zu überprüfende URL
 */
 function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = router;
