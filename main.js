var mymap = L.map('mapid').setView([47.0, 14.0], 7);

L.tileLayer('https://cartodb-basemaps-a.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Mitwirkende',
    maxZoom: 10,
}).addTo(mymap);
