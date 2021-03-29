function roundGPS(x) { // round to 6 decimal places
    return Math.round(x * 1000000) / 1000000
}

function manualGPS() {
    let lat = document.getElementById('latitude').value
    let lng = document.getElementById('longitude').value

    updateLatLng(lat, lng)
}

function updateLatLng(lat, lng) {
    marker.setLatLng([lat, lng])
    document.getElementById('latitude').value = roundGPS(marker.getLatLng().lat);
    document.getElementById('longitude').value = roundGPS(marker.getLatLng().lng);
    map.panTo([lat, lng]);
    update()
}

var marker = L.marker(new L.LatLng(50.087887, 14.387285), {
    draggable: true,
    autoPan: true
}).addTo(map);

marker.on('dragend', function (e) {
    updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
});

map.on('click', function (e) {
    marker.setLatLng(e.latlng);
    updateLatLng(marker.getLatLng().lat, marker.getLatLng().lng);
});


updateLatLng(50.087887, 14.387285)

document.getElementById('latitude').addEventListener('change', manualGPS)
document.getElementById('longitude').addEventListener('change', manualGPS)