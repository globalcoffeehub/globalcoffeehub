
// Basemaps mit Variablen initialisieren
 let basemapCartoDB = L.tileLayer.provider('CartoDB.Voyager');
 let basemapEsri = L.tileLayer.grayscale('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
})

// Karte darstellen
let map = L.map("mapid", {
    center: [12, 15],
    zoom: 2,
    layers: [
        basemapCartoDB
    ],
    maxZoom: 6,
    minZoom: 2,
    fadeAnimation: false 
});

// Layer Control
let iconLayersControl = new L.Control.IconLayers(
    [
        {
            title: 'Karte', // use any string
            layer: basemapCartoDB, // any ILayer
            icon: 'srcbasemap/cartodb_positron.png' // 80x80 icon
        },
        {
            title: 'Satellit',
            layer: basemapEsri,
            icon: 'srcbasemap/here_satelliteday.png'
        }
    ], {
        position: 'bottomleft',
        maxLayersInRow: 1
    }
).addTo(map);


// let layerControl = L.control.iconLayers({
//     "Satellitenbild": basemapEsri,
//     "Karte": basemapCartoDB,
// }, {}, {
//     "collapsed": true,
//     "position": "topleft"
// }).addTo(map);

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
        fillOpacity: 0.7,
        attribution: "Coffee Data: <a href=\"https://ourworldindata.org/grapher/coffee-bean-production\">Our world in Data/ UN FAO</a>"
    };
};

// Hovereffekt
let selectedElement;

function highlightFeature(e) {
    let layer = e.target; //gehovertes Element

    layer.setStyle({
        weight: 1,
        color: 'black',
        dashArray: '1',
        fillOpacity: 1
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
let info = L.control(); 

info.onAdd = function (mapid) {
    this._div = L.DomUtil.create('div', 'infobox'); // create a div with a class "info"
    this.update();
    return this._div;
};


info.update = function (feature) {// method that we will use to update the control based on feature properties passed
    this._div.innerHTML = '<h5>Kaffeeproduktion 2018</h5>' +  (feature ? // Conditional ob Hover
        '<b>' + feature.formal_de + '</b><br />' + feature.coffe_production + ' Tonnen'
        : 'Bewege die Maus über ein Land');
};

info.addTo(map);