let locationbutton = document.getElementById("userlocation");
locationbutton.addEventListener("click", getLocation);

// Einrichten der Mapbox mit eigenem access token und im Satelliten Modus mit Straßen
mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9udGhubW0iLCJhIjoiY2w4MDliMWQ0MDQxaTN2dDlsZXNocW1zaiJ9.qgxGDJPKapUlrGjZ4fy5Dg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/satellite-streets-v9",
  center: [50, 50],
  zoom: 2,
});

var directions
map.on("load", function () {
  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });
  map.addControl(directions, "top-left");

/**
 * for schleife um die Marker mit eigenem Bild auf die Karte zu bekommen
 * source: https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
 */
  for (const marker of geojson) {
    // Create a DOM element for each marker.
    let el = document.createElement("div");
    el.className = "marker";
    el.style.backgroundImage = "url(images/mountain.png)";
    el.style.width = "50px";
    el.style.height = "50px";
    el.style.backgroundSize = "100%";

    el.addEventListener("click", () => {
      setTimeout(function () {
        directions.setDestination(marker.geometry.coordinates);
      }, 500);
    });

    // Add markers to the map.
    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  }
});

/**
  * getLocation
  * @public
  * @desc Funktion um die position des Nutzers zu erfassen und diese als Start- oder Endpunkt für die Navigation zu verwenden
  * @source https://www.w3schools.com/html/html5_geolocation.asp
  */
function getLocation() {
  var standort = [];
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      standort.push(position.coords.latitude, position.coords.longitude);
      directions.setOrigin([standort[1], standort[0]]);
    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
