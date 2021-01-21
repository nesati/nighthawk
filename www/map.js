var map = L.map('mapid').setView([50.0878859, 14.3873313], 15);
map.invalidateSize()
var photoIcon = L.icon({
    iconUrl: 'img/photo-icon.svg',

    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch("markers.json").then(r => {
    if (r.ok) {
        r.json().then(data => {
            data.forEach(val => {
                L.marker([val["lat"], val["lng"]], {icon: photoIcon}).addTo(map)
                    .bindPopup(val["desc"])
                    .on('click', function (e) {
                        alert(e.latlng);
                    })
            })
        });
    }
});
window.dispatchEvent(new Event('resize'))