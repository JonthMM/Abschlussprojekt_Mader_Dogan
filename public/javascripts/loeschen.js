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
});

// hinzufügen der Marker mit ihren Koordinaten und dem eigenem Gebirge Icon
geojson.forEach((marker) => {
    var marker = L.marker([
        marker.geometry.coordinates[1],
        marker.geometry.coordinates[0],
    ], { icon: customMountainIcon })
    marker.addTo(map)
    marker.on("click", onClick);
});

/**
 * Dieses Event macht es möglich, dass ein Marker beim darauf klicken ausgewählt wird und die
 * Elemente zum löschen angezeigt werden
 * @param {*} e
 * @source: https://stackoverflow.com/questions/16927793/marker-in-leaflet-click-event
 * https://stackoverflow.com/questions/18382945/how-do-i-get-the-latlng-after-the-dragend-event-in-leaflet
 */
function onClick(e) {
    let mountain = geojson.find((marker) => 
    marker.geometry.coordinates[0] == e.target._latlng.lng || 
    marker.geometry.coordinates[1] == e.target._latlng.lat);

    // Ausfüllen der Elemente zum bearbeiten unter der Karte
    document.getElementById("id").value = mountain._id;
    document.getElementById("mountain").value = mountain.properties.name;
    document.getElementById("altitude").value = mountain.properties.altitude;
    document.getElementById("url").value = mountain.properties.url;
    document.getElementById("beschreibung").value = mountain.properties.description;
    document.getElementById("long").value = mountain.geometry.coordinates[0];
    document.getElementById("lat").value = mountain.geometry.coordinates[1];
}

