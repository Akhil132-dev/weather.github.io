const inputId = document.getElementById('input-box');

const ciyt = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const maxmin = document.getElementById('minmax');
const weatherType = document.getElementById('weathertype');




const waetherAPi = {
    key: 'e8edd9ab6894f9923a24ee0e6627e736',
    baseurl: 'https://api.openweathermap.org/data/2.5/weather?q='
    // { city name }& appid={ API key }
}


inputId.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        // console.log(inputId.value);
        getWeatherReport(inputId.value)

    }

});
function getWeatherReport(city) {
    fetch(`${waetherAPi.baseurl} ${city}&appid=${waetherAPi.key}&units=metric`).then(weather => {
        return weather.json();
    }).then(showWaetherReport);
}
function showWaetherReport(weather) {
    if (weather.cod == "404") {

        alert("Please Cheak the name Of the city OR Refresh The browser");
        document.querySelector('.weather-body').style.display = "none";
        return;
    }

    ciyt.innerText = `${weather.name},${weather.sys.country}`;
    temp.innerHTML = `${Math.round(weather.main.temp)}&degC`
    // console.log(`${Math.floor(weather.main.temp_min)}&degC (min) /${Math.ceil(weather.main.temp_max)}`);
    maxmin.innerHTML = `${Math.floor(weather.main.temp_min)}&degC (min) /${Math.ceil(weather.main.temp_max)}&degC (max) `
    weatherType.innerHTML = `${weather.weather[0].main}`;

    let newdate = new Date();
    // console.log(newdate);
    date.innerText = datemage(newdate);
    if (weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url(./img/clear.jpg)"
    }
    else if (weatherType.textContent == 'Clouds') {
        document.body.style.backgroundImage = "url(./img/clude.jpg)"
    }
    else if (weatherType.textContent == 'Haze') {
        document.body.style.backgroundImage = "url(./img/haze.jpg)"
    }
    else if (weatherType.textContent == 'Snow') {
        document.body.style.backgroundImage = "url(./img/snow.jpg)"
    }
    else if (weatherType.textContent == 'rain') {
        document.body.style.backgroundImage = "url(./img/rain.jpg)"
    }
    else if (weatherType.textContent == 'Thunderstorm') {
        document.body.style.backgroundImage = "url(./img/Thounders.jpg)"
    } document.querySelector('.weather-body').style.display = "block";
}
function datemage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Wednesday", "Saturday", "Friday"];
    let Months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "Octobar", "November"];
    let Year = dateArg.getFullYear();
    let Monthe = Months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${Monthe} (${day}) , ${Year}`;

}