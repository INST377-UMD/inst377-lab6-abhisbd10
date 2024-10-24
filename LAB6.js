async function mapping(){
    const markLocality = await getLocality();
    console.log(markLocality)
    var map = L.map('map').setView([38.7946, -106.5348], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

for (let i = 0; i < coordinates.length; i++){
    const {lat, lng} = coordinates[i];
    const locality = await getLocality(lat, lng);


    var markers = L.marker([lat, lng]).addTo(map);

    document.getElementById(`marker${i + 1}-coordinates`).innerText =
    `Latitude: ${lat}, Longitude: ${lng}`;
    document.getElementById(`marker${i + 1}-locality`).innerText = `Locality: ${locality}`;

}

const group = L.featureGroup(coordinates.map(coord => L.marker([coord.lat, coord.lng])));
            map.fitBounds(group.getBounds());
        }

window.onload = mapping;


function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number

    }

const coordinates = [
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
        { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) }
      ];


async function getLocality(lat, lng){
    console.log("Fetching locality for Latitude: ${lat}, Longitude: ${lng}");
    const markLocality = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then((res) => res.json());
    return markLocality.locality || markLocality.city || 'Unknown location';
     
    }

