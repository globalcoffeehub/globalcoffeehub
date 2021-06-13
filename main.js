/*var mymap = L.map('mapid').setView([47.0, 14.0], 7);

L.tileLayer.provider('Stamen.Watercolor', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende',
   
}).addTo(mymap); */


let basemapEsri = L.tileLayer.provider('Esri.WorldImagery')
let basemapCartoDB= L.tileLayer.provider('CartoDB.Positron')


let map = L.map("mapid", {
    center: [0, 15],
    zoom: 2,
    layers: [
        basemapCartoDB
    ],
    maxzoom: 12,
});



let layerControl = L.control.layers({
    "Satellitenbild": basemapEsri,
    "Karte": basemapCartoDB,
}).addTo(map);