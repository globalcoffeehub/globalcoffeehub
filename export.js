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

// Funktion Layer Control mit iconLayer Plugin
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
    }).arrowheads()
    .addTo(expomap);

// zoom the map to the polyline
map.fitBounds(polyline.getBounds());

var polyline = L.polyline([coords]).arrowheads()
