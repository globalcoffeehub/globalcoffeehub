// Basemaps mit Variablen initialisieren
let basemapEsri = L.tileLayer.provider('Esri.WorldImagery');
let basemapCartoDB = L.tileLayer.provider('CartoDB.Positron');

// Karte darstellen
let map = L.map("mapid", {
    center: [0, 15],
    zoom: 2,
    layers: [
        basemapCartoDB
    ],
    maxZoom: 6,
    minZoom: 2,
});


// Layer Control
let layerControl = L.control.layers({
    "Satellitenbild": basemapEsri,
    "Karte": basemapCartoDB,
}, {}, {
    "collapsed": true,
    "position": "topleft"
}).addTo(map);

///// GEOJSON ZU KARTE HINZUFÜGEN (GeoJSON Variable befindet sich in coffe_countries.js)/////
// Choropletenfarbe bestimmen
function getProductionColor(prod) { //Funktion mit JS ternary operator (wie if eine conditional Abfrage)
    return prod > 1000000 ? '#DF0000' :
        prod > 100000 ? '#FA5D20' :
        prod > 50000 ? '#FABB00' :
        prod > 30000 ? '#FAEB20' :
        prod > 10000 ? '#FAFF56' :
        '#E8FF9C';
};

function productionStyle(feature) {
    return { //Style Funktion
        fillColor: getProductionColor(feature.properties.coffe_production),
        weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.7
    };
};

// Hovereffekt
let selectedElement;
let info = L.control();

function highlightFeature(e) {
    let layer = e.target; //gehovertes Element

    layer.setStyle({
        weight: 2,
        color: 'black',
        dashArray: '2',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront(); //Hoverhervorhebung browserspezifisch auf erste Ebene überlagern
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) { // nach dem Hovern Style auf Ursprung zurücksetzen
    selectedElement.resetStyle(e.target);
    info.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

selectedElement = L.geoJson(coffeeProducerCountries, {
    style: productionStyle,
    onEachFeature: onEachFeature
}).addTo(map);

// Wert anzeigen bei Hover

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (feature) {
    this._div.innerHTML = '<h4>Kaffeeproduktion 2018 in Tonnen</h4>' +  (feature ? // Conditional ob Hover
        '<b>' + feature.formal_de + '</b><br />' + feature.coffe_production + 't'
        : 'Bewege die Maus über ein Land');
};

info.addTo(map);