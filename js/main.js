const bannerContainer = document.querySelector(".banner__container");
const ipInput = document.querySelector(".ip__input");
const submitBtn = document.querySelector(".submit__btn");
const ipAddress = document.querySelector(".ip__address");
const locations = document.querySelector(".location");
const timezone = document.querySelector(".timezone")
const isp = document.querySelector(".isp");

function initializingMap() {
    // call this method before you initialize your map.
    const container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
  }

function showPosition(lat, long){
    initializingMap();
    const map = L.map('map').setView([lat, long], 12);
    const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

    L.tileLayer(tileUrl, {
        maxZoom: 18,
        attribution: false,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1
    }).addTo(map);
    
    const myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [30, 40],
        iconAnchor: [25, 16],
    });
    
    L.marker([lat, long], {icon: myIcon})
    .addTo(map)
    .bindPopup("You are here")
    .openPopup();;
    }


submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(ipInput.value)
    getIpInfo(ipInput.value);
    ipInput.value = "";
  
  })

async function getIpInfo(address){
    try{
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_sTdR27yhnWpRD085KR05jAYDuJ7rq&ipAddress=${address}`);
        if(!res.ok)
         throw new Error(`Error with the api, ${res.status}`);

         const data = await res.json();
         showPosition(data.location.lat, data.location.lng);
         console.log(data);
         displayIpInfo(data);
        
    }

    catch(err){
        console.log(err.message);
    }
}


function displayIpInfo(info){
    ipAddress.textContent = `${info.ip}`;
    locations.textContent = `${info.location.region}, ${info.location.country}`;
    timezone.textContent = `UTC ${info.location.timezone}`;
    isp.textContent =  `${info.isp}`;

}



// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// }

// function showPosition(position) {
//   console.log(position.coords)
// }

// getLocation()
