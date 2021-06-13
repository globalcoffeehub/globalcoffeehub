// Basemaps mit Variablen initialisieren
let basemapEsri = L.tileLayer.provider('Esri.WorldImagery')
let basemapCartoDB = L.tileLayer.provider('CartoDB.Positron')

// Karte darstellen
let map = L.map("mapid", {
    center: [0, 15],
    zoom: 2,
    layers: [
        basemapCartoDB
    ],
    maxzoom: 12,
});


// Layer Control
let layerControl = L.control.layers({
    "Satellitenbild": basemapEsri,
    "Karte": basemapCartoDB,
}).addTo(map);

// GeoJSON zu Karte hinzufügen, GeoJSON Variable in coffe_countries.js
let myStyle = { // GeoJSON Stylen
    "color": "red",
    "weight": 2,
    "opacity": 0.5
};

let countriesLayer = L.geoJSON(coffeeProducerCountries, {
    style: function(feature) {
        // switch (feature.properties.coffe_export) {
        //     case 20: return {color: "#ff0000"};
        //     case 'Philippines':   return {color: "#0000ff"};
        // }
    }
}).addTo(map);
