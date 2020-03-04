const weather = document.querySelector( ".js-weather")
const API_KEY = "52d18a19a54d5890526ecce2842d24f2"
const COORDS = "coords"

function saveCoords(coordObj){
    localStorage.setItem(COORDS, JSON.stringify(coordObj));
}

function getWeather(lat, lng){
    fetch(`https:api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText=`${temperature}C: ${place}`;});
    }

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
        latitude,
        longitude
    };
    saveCoords(coordObj);
    getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Can't Access Geo_Location ");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}


function loadCoords(){
const loadedCoords = localStorage.getItem("COORDS")
if(loadedCoords===null){
    askForCoords();
}else{ 
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords. latitude, parseCoords.longitude)

}
}

function init() {
    loadCoords();
}
init();