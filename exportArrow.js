var selectedMap;
var selectedMapPop;

// Karte darstellen
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

// Layer Control mit iconLayer Plugin
function makeLayerControl (map) {
    new L.Control.IconLayers(
    [
        {
            title: 'Karte', 
            layer: L.tileLayer.provider('CartoDB.Voyager'),
            icon: 'srcbasemap/cartodb_positron.png' 
        },
        {
            title: 'Satellit',
            layer: L.tileLayer.grayscale('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {attribution: "Tiles © Esri"
        }),
            icon: 'srcbasemap/here_satelliteday.png'
        }
    ], {
        position: 'topleft',
        maxLayersInRow: 1
    }
).addTo(map);
}


// Karte Export
var expomap = L.map('expomap').setView([35, -95], 5);
L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw')
.addTo(expomap);

var data = [{"from":[-118.2705,33.9984],"to":[-122.789336,37.920458],"labels":["Los Angeles","San Francisco"],"color":"#ff3a31"},{"from":[-118.2705,33.9984],"to":[-80.247887,25.792296],"labels":[null,"Miami"],"color":"#ff7e2b"},{"from":[-118.2705,33.9984],"to":[-73.999705,40.795047],"labels":[null,"New York"],"color":"#ffc726"},{"from":[-118.2705,33.9984],"to":[-87.724088,41.917846],"labels":[null,"Chicago"],"color":"#e9ff20"},{"from":[-118.2705,33.9984],"to":[-92.145189,46.77372],"labels":[null,"Duluth"],"color":"#99ff1b"},{"from":[-118.2705,33.9984],"to":[-111.824547,40.788055],"labels":[null,"Salt Lake"],"color":"#45ff15"},{"from":[-118.2705,33.9984],"to":[-111.364615,47.536109],"labels":[null,"Great Falls"],"color":"#10ff33"},{"from":[-118.2705,33.9984],"to":[-97.585039,35.511099],"labels":[null,"Oklahoma"],"color":"#0aff84"},{"from":[-118.2705,33.9984],"to":[-115.157907,36.173032],"labels":[null,"Las Vegas"],"color":"#05ffd9"},{"from":[-118.2705,33.9984],"to":[-103.196215,34.418753],"labels":[null,"Clovis"],"color":"#00ccff"}];

var data2=[{"from":[-73.875523,40.781063],"to":[-80.247887,25.792296],"labels":["New York","Maima"],"color":"#05ffd9"},{"from":[-73.875523,40.781063],"to":[-118.2705,33.9984],"labels":[null,"Los Angeles"],"color":"#00ccff"},{"from":[-73.875523,40.781063],"to":[-87.724088,41.917846],"labels":[null,"Chicago"],"color":"#ffc726"},{"from":[-73.875523,40.781063],"to":[-71.058437,42.35902],"labels":[null,"Boston"],"color":"#e9ff20"},{"from":[-73.875523,40.781063],"to":[-75.683057,45.42172],"labels":[null,"Ottawa"],"color":"#99ff1b"}];

data = data.map(item => { return {...item, value: parseInt(Math.random()*20)}});
data2 = data2.map(item => { return {...item, value: parseInt(Math.random()*20)}});

var exportLayer = new L.exportLayer({
    map: expomap,
    data: data,
    pulseRadius:30,
    pulseBorderWidth:3,
    arcWidth:1,
    arcLabel:true,
    arcLabelFont:'10px sans-serif',
    maxWidth:10
    }
);
exportLayer.addTo(expomap);

// Funktionen
// weniger???
function setData(){
    exportLayer.setData(data2);
}
function hide(){
    exportLayer.hide();
}
function show(){
    exportLayer.show();
}
function play(){
    exportLayer.play();
}
function pause(){
    exportLayer.pause();
}
function destroy() {
    exportLayer.destroy();
}

// Data
// data = [{"from":[-118.2705,33.9984],"to":[-122.789336,37.920458],"labels":["Los Angeles","San Francisco"],"color":"#ff3a31","value":15}];
