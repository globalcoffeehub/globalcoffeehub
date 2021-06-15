// Funktion Karte darstellen
function makemap(mapid) {
    let map = L.map(mapid, {
        center: [12, 15],
        zoom: 2,
        layers: L.tileLayer.provider('CartoDB.Voyager'),
        maxZoom: 6,
        minZoom: 2,
        fadeAnimation: false
    });
    return map
}

// Fuktion Layer Control mit iconLayer Plugin
function makeLayerControl(map) {
    new L.Control.IconLayers(
        [{
                title: 'Karte',
                layer: L.tileLayer.provider('CartoDB.Voyager'),
                icon: 'srcbasemap/cartodb_positron.png'
            },
            {
                title: 'Satellit',
                layer: L.tileLayer.grayscale('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: "Tiles © Esri"
                }),
                icon: 'srcbasemap/here_satelliteday.png'
            }
        ], {
            position: 'topleft',
            maxLayersInRow: 1
        }
    ).addTo(map);
}

// KARTE EXPORT

// Karte Export mit Funktion erzeugen
let expomap = makemap("expomap");
makeLayerControl(expomap);

// Data for green coffee exports from Top 5 coffee countries in 2019/20, by country of destination
// data from www.statista.com
// Tested for Brazil & 3 countries first
var dataBrazil = [{
    "from": [-15.749997, -47.9499962],
    "to": [37.6, -95.665],
    "labels": ["Brasilien", "Vereinigte Staaten von Amerika"],
    "color": "#ff3a31"
}, {
    "from": [-15.749997, -47.9499962],
    "to": [51.1642292, 10.4541194],
    "labels": [null, "Deutschland"],
    "color": "#ff7e2b"
}, {
    "from": [-15.749997, -47.9499962],
    "to": [41.29246, 12.5736108],
    "labels": [null, "Italien"],
    "color": "#ffc726"
}, ];


data = data.map(item => {
    return {
        ...item,
        value: parseInt(Math.random() * 20)
    }
});

/* data2 = data2.map(item => {
    return {
        ...item,
        value: parseInt(Math.random() * 20)
    }
}); */

var exportLayer = new L.exportLayer({
    map: expomap,
    data: data,
    pulseRadius: 30,
    pulseBorderWidth: 3,
    arcWidth: 1,
    arcLabel: true,
    arcLabelFont: '10px sans-serif',
    maxWidth: 10
});
exportLayer.addTo(expomap);

// Funktionen
// vielleicht nur gebraucht, wenn mehr Länder vergleichen
/* function setData() {
    exportLayer.setData(data2);
}

function hide() {
    exportLayer.hide();
}

function show() {
    exportLayer.show();
}

function play() {
    exportLayer.play();
}

function pause() {
    exportLayer.pause();
} */