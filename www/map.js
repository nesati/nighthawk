const map = L.map('mapid').setView([50.0878859, 14.3873313], 15);
map.invalidateSize()
const photoIcon = L.icon({
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
                    .bindPopup(val["title"])
                    .on('click', function (e) {
                        compare(val["img1"], val["img2"])
                        document.getElementById('img-right').src = [val["img1"]],
                        document.getElementById('img-left').src = [val["img2"]],
                        document.getElementById('title-of-comparison').innerHTML = [val["desc"]],
                        document.getElementById('img-right-year').innerHTML = [val["img1-year"]],
                        document.getElementById('img-left-year').innerHTML = [val["img2-year"]],
                        document.getElementById('img-left-index').href = [val["img2-href"]],
                        document.getElementById('img-left-index').innerHTML = [val["img2-src"]],
                        document.getElementById('img-right-index').href = [val["img1-href"]],
                        document.getElementById('img-right-index').innerHTML = [val["img1-src"]];
                    })
            })
        });
    }
});
window.dispatchEvent(new Event('resize'))