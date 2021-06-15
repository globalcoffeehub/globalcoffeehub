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

// create polylines from an array of arrays of LatLng points
// brazil to ...
var latlngs = [
    [ //usa
        [-15.749997, -47.9499962],
        [37.6, -95.665]
    ],
    [ //germany
        [-15.749997, -47.9499962],
        [51.1642292, 10.4541194]
    ],
    [ //italy
        [-15.749997, -47.9499962],
        [41.29246, 12.5736108]
    ]
];

var marker = L.marker(
    [-15.749997, -47.9499962] 
    //, [37.6, -95.665], [51.1642292, 10.4541194], [41.29246, 12.5736108]
).addTo(expomap);

var polyline = L.polyline(latlngs, {
    color: 'green'
}).addTo(expomap);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());


// Bezier Animation

var options = {
    color: 'rgb(145, 146, 150)',
    fillColor: 'rgb(145, 146, 150)',
    dashArray: 8,
    opacity: 0.8,
    weight: '1',
    iconTravelLength: 0.5, //How far icon should go. 0.5 = 50%
    iconMaxWidth: 50,
    iconMaxHeight: 50,
    fullAnimatedTime: 7000,// animation time in ms
    easeOutPiece: 4, // animation easy ou time in ms
    easeOutTime: 2500, // animation easy ou time in ms
};

L.bezier({
    path: [
        [
            {lat: -15.749997, lng: -47.9499962},
            {lat: 37.6, lng: -95.665},
        ]
    ],

    icon: {
        path: "beanicon.png"
    }
}, options).addTo(expomap);



/* // Data for green coffee exports from Top 5 coffee countries in 2019/20, by country of destination
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
});

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