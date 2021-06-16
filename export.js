// Funktion Karte darstellen
function makemap(mapid) {
    let map = L.map(mapid, {
        fullscreenControl: true, // plugin for Leaflet that adds fullscreen button to your maps
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
    [-15.749997, -47.9499962] //, [37.6, -95.665], [51.1642292, 10.4541194], [41.29246, 12.5736108]
).addTo(expomap);

// Brazil to USA
var usaline = L.polyline(latlngs[0], {
        color: '#5C0000',
        opacity: 0.8
    }).arrowheads({
        size: '5%',
        proportionalToTotal: true,
        fill: true,
    })
    .addTo(expomap);

// adjust Text Path 
usaline.setText('43,98', {
    repeat: false,
    offset: 20,
    attributes: {
        fill: '#5C0000',
        'font-weight': 'light',
        'font-size': '15',
        'font-family': 'Noto Sans TC',
    },
    center: true,
    orientation: 180,
    below: true,
});

// Brazil to Germany
var gerline = L.polyline(latlngs[1], {
    color: '#5C0000',
    opacity: 0.8
}).arrowheads({
    size: '5%',
    proportionalToTotal: true,
    fill: true,
})
.addTo(expomap);

gerline.setText('38,39', {
repeat: false,
offset: -10,
attributes: {
    fill: '#5C0000',
    'font-weight': 'light',
    'font-size': '15',
    'font-family': 'Noto Sans TC',
},
center: true,
orientation: 0,
});

// Brazil to Italy
var itline = L.polyline(latlngs[2], {
    color: '#5C0000',
    opacity: 0.8
}).arrowheads({
    size: '5%',
    proportionalToTotal: true,
    fill: true,
})
.addTo(expomap);

itline.setText('21,64', {
repeat: false,
offset: 15,
attributes: {
    fill: '#5C0000',
    'font-weight': 'light',
    'font-size': '15',
    'font-family': 'Noto Sans TC',
},
center: true,
orientation: 0,
below: true,
});

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());