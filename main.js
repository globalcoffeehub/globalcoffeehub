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

// --- KARTE PRODUKTION TOTAL --- 

// Karte Produktion total mit Funktion erzeugen
let mapproduction = makemap("mapproduction");
makeLayerControl (mapproduction);

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
        attribution: "Data: <a href=\"https://ourworldindata.org/grapher/coffee-bean-production\">Our world in Data/FAO</a>"
    };
};

// Hovereffekt

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
    infoPop.update(layer.feature.properties);
}

function resetHighlight(e) { // nach dem Hovern Style auf Ursprung zurücksetzen
    selectedMap.resetStyle(e.target);
    info.update();
    infoPop.update();
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
}

selectedMap = L.geoJson(coffeeProducerCountries, {
    style: productionStyle,
    onEachFeature: onEachFeature
}).addTo(mapproduction);


// Wert anzeigen bei Hover
let info = L.control(); 

info.onAdd = function (mapid) {
    this._div = L.DomUtil.create('class', 'infobox'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (feature) {// method that we will use to update the control based on feature properties passed
    this._div.innerHTML = '<h5>Kaffeeproduktion 2018</h5>' +  (feature ? // Conditional ob Hover
        '<b>' + feature.formal_de + '</b><br />' + feature.coffe_production + ' Tonnen'
        : 'Bewege die Maus über ein Land');
};

info.addTo( );


// --- KARTE PRODUKTION/ KOPF ---

// Karte Produktion pro Kopf mit Funktion erzeugen
let mapproductionperson = makemap("mapproductionperson");
makeLayerControl (mapproductionperson);

// Choropletenfarbe bestimmen
function getProductionColorPop(prod, pop) { //Funktion mit JS ternary operator (wie if eine conditional Abfrage)
    return prod > 1000000 ? '#DF0000' :
        ((prod / pop)*1000) > 10 ? '#FA5D20' :
        ((prod / pop)*1000) > 5 ? '#FABB00' :
        ((prod / pop)*1000) > 2 ? '#FAEB20' :
        ((prod / pop)*1000) > 0.5 ? '#FAFF56' :
        '#E8FF9C';
};
function productionStylePop(feature) {
    return { //Style Funktion
        fillColor: getProductionColorPop(feature.properties.coffe_production, feature.properties.pop_est),
        weight: 1,
        opacity: 1,
        color: 'grey',
        dashArray: '1',
        fillOpacity: 0.7,
        attribution: "Data: <a href=\"https://ourworldindata.org/grapher/coffee-bean-production\">Our world in Data/FAO</a>"
    };
};

// Hovereffekt

function highlightFeaturePop(e) {
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
    infoPop.update(layer.feature.properties);
}

function resetHighlightPop(e) { // nach dem Hovern Style auf Ursprung zurücksetzen
    selectedMapPop.resetStyle(e.target);
    info.update();
    infoPop.update();
}

function onEachFeaturePop(feature, layer) {
    layer.on({
        mouseover: highlightFeaturePop,
        mouseout: resetHighlightPop,
    });
}

selectedMapPop = L.geoJson(coffeeProducerCountries, {
    style: productionStylePop,
    onEachFeature: onEachFeaturePop
}).addTo(mapproductionperson);

// Wert anzeigen bei Hover
let infoPop = L.control(); 

infoPop.onAdd = function () {
    this._div = L.DomUtil.create('class', 'infobox'); // create a div with a class "info"
    this.update();
    return this._div;
};

infoPop.update = function (feature) {// method that we will use to update the control based on feature properties passed
    this._div.innerHTML = '<h5>Kaffeeproduktion 2018 <br>pro EW</h5>' +  (feature ? // Conditional ob Hover
        '<b>' + feature.formal_de + '</b><br />' + Math.round((feature.coffe_production/feature.pop_est)*10000)/10 + ' Kilo/Einwohner'
        : 'Bewege die Maus über ein Land');
};
infoPop.addTo(mapproductionperson);