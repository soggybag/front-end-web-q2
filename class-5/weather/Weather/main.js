// A helper function 
function getId(id) {
    return document.getElementById(id);
}

// Get references to all of the elements that display info
var coords = getId("coords");
var weatherMain = getId("weather-main");
var desc = getId("desc");
var icon = getId("icon");
var temp = getId("temp");
var temp_min = getId("temp_min");
var temp_max = getId("temp_max");
var pressure = getId("pressure");
var humidity = getId("humidity");
var speed = getId("speed");
var clouds = getId("clouds");
var dt = getId("dt");
var sunrise = getId("sunrise");
var sunset = getId("sunset");
var locationName = getId("location-name");

var cityForm = getId("city-form");
var cityInput = getId("city-input");
var saveCityButton = getId("save-city-button");




// Load weather for the city saved in local storage, if there is a one...
var savedCity = getCity();
console.log(savedCity);
if (savedCity != null) {
    loadData(savedCity);
}



// Call this method with the city name to load weather for that city
function loadData(city) {
    // Register and get an api key
    var apikey = "2854c5771899ff92cd962dd7ad58e7b0";
    // Make a path with the city and api key
    var path = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;

    // Use jQuery to load JSON data. 
    $.get(path, function (data) {
        // Print the data to console. Go look at it right now!
        console.log(data);

        // Collect values from the json data and display it in each of the divs above. 
        coords.innerHTML = data.coord.lat + " " + data.coord.lon;

        // data.weather array sometimes has more than one item! 
        weatherMain.innerHTML = data.weather[0].main;
        desc.innerHTML = data.weather[0].description;
        // * Use the icon name to load an image for the weather. 
        icon.innerHTML = "<img src='weather-icons/" + data.weather[0].icon + ".svg'>";
        // For more info on icons and condition codes: https://openweathermap.org/weather-conditions

        // * Convert the temp from Kelvin to F or C.
        temp.innerHTML = kToF(data.main.temp);

        // * Convert these from K to T or C.
        temp_min.innerHTML = kToF(data.main.temp_min);
        temp_max.innerHTML = kToF(data.main.temp_max);

        pressure.innerHTML = data.main.pressure;
        humidity.innerHTML = data.main.humidity + "%";

        // Wind - These properties are some times missing. Check for undefined before displaying them!
        var speed = data.wind.speed;
        var deg = data.wind.deg;
        var gust = data.wind.gust;

        speed.innerHTML = speed;

        clouds.innerHTML = data.clouds.all;
        dt.innerHTML = new Date(data.dt * 1000).toDateString();
        sunrise.innerHTML = getTimeFrom(new Date(data.sys.sunrise * 1000));
        sunset.innerHTML = getTimeFrom(new Date(data.sys.sunset * 1000));
        locationName.innerHTML = data.name;
    });
}

cityForm.onsubmit = function (event) {
    event.preventDefault();

    var city = cityInput.value;
    loadData(city);
}

saveCityButton.onclick = function (event) {
    var city = cityInput.value;
    saveCity(city);
}

// Save city to local storage

function saveCity(cityName) {
    localStorage.setItem("weather-app", cityName);
}

// !!! This possibly returns null you must handle this!
function getCity() {
    return localStorage.getItem("weather-app");
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTimeFrom(date) {
    var h = addZero(date.getHours());
    var m = addZero(date.getMinutes());
    var s = addZero(date.getSeconds());
    return h + ":" + m + ":" + s;
}

function kToF(t) {
    // Do some math and round to two decimal places.
    return (t * 9 / 5 - 459.67).toFixed(2);
}

function kToC(t) {
    return (t - 273.15).toFixed(2);
}