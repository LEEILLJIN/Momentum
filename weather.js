const weather = document.querySelector(".js-weather");

const API_KEY = "a01a1c649a53d35a88a0fa1add6d1512";
const COORDS = 'coords';

function getWeather(lat, lon){//?????????https://www.daleseo.com/js-async-promise/
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temp = json.main.temp;
            const place = json.name;
            weather.innerText = `${temp} @${place}`;
        });
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude, //=latitude: latitude,같은 의미
        longitude//=longitude: longitude같은 의미
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access ger location');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);//내 위치를 알아낼 수 있음
}
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}



function init(){
    loadCoords();
}
init();