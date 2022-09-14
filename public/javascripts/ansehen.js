// erstellen einer leaflet Karte mit Europa als Startpunkt und mit OSM als Basiskarte
var map = L.map("map").setView([51, 24], 4);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// spezielles Design für die Marker der Gebirge
var customMountainIcon = L.icon({
    iconUrl: 'images/mountain.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [13, 0] // point from which the popup should open relative to the iconAnchor
  });

// popup größe regulieren
var customPoint = {
    'maxWidth': '500',
  }

// für jeden Marker (geojson), also Gebirge in der Datenbank ein Popup erstellen mit hilfe von
// forEach(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach?retiredLocale=de
geojson.forEach((marker) => {

    // https://stackoverflow.com/questions/36713284/adding-a-table-around-the-pop-up-information-in-leaflet
    let popupTabelle =
        "<table  class='table table-striped table-success table-hover'>" +
        "  <tr>" +
        "    <th>Name</th>" +
        "    <td>" +
        marker.properties.name +
        "</td>" +
        "  </tr>" +
        "  <tr>" +
        "    <th>Höhe</th>" +
        "    <td>" +
        marker.properties.altitude +
        "</td>" +
        "  </tr>" +
        "  <tr>" +
        "    <th>URL</th>" +
        "    <td>" +
        marker.properties.url +
        "</td>" +
        "  </tr>" +
        "  <tr>" +
        "    <th>Beschreibung</th>" +
        "    <td>" +
        marker.properties.description +
        "</td>" +
        "  </tr>" +
        "</table>"

    var marker = L.marker([
        marker.geometry.coordinates[1],
        marker.geometry.coordinates[0],
    ], { icon: customMountainIcon })
    marker.addTo(map)
    marker.bindPopup(popupTabelle, customPoint)
});


// mithilfe von forEach für den Array der Marker (geojson) iterieren und dann jeden Wert mit DOM in die Tabelle einspeisen
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach?retiredLocale=de
// https://www.w3schools.com/jsref/met_table_insertrow.asp

geojson.forEach((marker, i = 0) => {
  i++;

  // Find a <table> element with id="gebirgsTabelle":
  var gebirgsTabelle = document.getElementById('gebirgsTabelle');

  // Create an empty <tr> element and add it to the -1st position of the table:
  var row = gebirgsTabelle.insertRow(-1);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  // assigning the marker attributes to the cells
  cell1.innerHTML = marker.properties.name;
  cell2.innerHTML = marker.properties.altitude;
  cell3.innerHTML = marker.properties.description;
  cell4.innerHTML = marker.geometry.coordinates[1];
  cell5.innerHTML = marker.geometry.coordinates[0];
  cell6.innerHTML = marker.properties.url;
});
