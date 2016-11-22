// Get references to all of the elements that display info
var coords = $("#coords");
var weatherMain = $("#weather-main");
var desc = $("#desc");
var icon = $("#icon");
var temp = $("#temp");
var temp_min = $("#temp_min");
var temp_max = $("#temp_max");
var pressure = $("#pressure");
var humidity = $("#humidity");
var speed = $("#speed");
var clouds = $("#clouds");
var dt = $("#dt");
var sunrise = $("#sunrise");
var sunset = $("#sunset");
var locationName = $("#location-name");

var cityForm = $("#city-form");
var cityInput = $("#city-input");
var saveCityButton = $("#save-city-button");

// Load weather for the city saved in local storage, if there is a one...
var savedCity = getCity();
// Check this city if nothing was saved it should be undefined.
if (savedCity != undefined) {
    // We saved a city load the weather!
    console.log("Loading Saved city:"+saveCity);
    loadData(savedCity);
} else {
    console.log("No saved city to load");
    $("body").addClass("no-weather");
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
        
        // Check for errors
        if (data.cod == 200) {
            $("body").removeClass("no-weather");
        } else {
            $("body").addClass("no-weather");
            return
        }
        

        // Collect values from the json data and display it in each of the divs above. 
        coords.html(data.coord.lat + " " + data.coord.lon);

        // data.weather array sometimes has more than one item! 
        weatherMain.html(data.weather[0].main);
        desc.html(data.weather[0].description);
        // * Use the icon name to load an image for the weather. 
        icon.html("<img src='weather-icons/" + data.weather[0].icon + ".svg'>");
        // For more info on icons and condition codes: https://openweathermap.org/weather-conditions

        // * Convert the temp from Kelvin to F or C.
        temp.html(kToF(data.main.temp, 0));

        // * Convert these from K to T or C.
        temp_min.html(kToF(data.main.temp_min, 0));
        temp_max.html(kToF(data.main.temp_max, 0));

        pressure.html(data.main.pressure);
        humidity.html(data.main.humidity + "%");

        // Wind - These properties are some times missing. Check for undefined before displaying them!
        var windSpeed = data.wind.speed;
        var windDeg = data.wind.deg;
        var windGust = data.wind.gust;

        speed.html(windSpeed);

        clouds.html(data.clouds.all);
        dt.html(new Date(data.dt * 1000).toDateString());
        sunrise.html(getTimeFrom(new Date(data.sys.sunrise * 1000)));
        sunset.html(getTimeFrom(new Date(data.sys.sunset * 1000)));
        locationName.html(data.name);
    });
}


// Form

$("#city-form").submit(function (event) {
    event.preventDefault();
    console.log("City form Submit");
    var city = cityInput.val();
    $(".city-form-container").removeClass("show");
    // Show loading progress??
    loadData(city);
});

saveCityButton.click(function (event) {
    event.preventDefault();
    var city = cityInput.val();
    saveCity(city);
});

// Save city to local storage

function saveCity(cityName) {
    localStorage.setItem("weather-app", cityName);
}

// !!! This possibly returns null you must handle this!
function getCity() {
    return localStorage.getItem("weather-app");
}


// Buttons

$("#location-button").click(function(){
    $(".city-form-container").addClass("show");
});

$("#save-city-button").click(function(){
    // $(".city-form-container").addClass("show");
});


// Helper functions 


function padWithZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTimeFrom(date) {
    var h = padWithZero(date.getHours());
    var m = padWithZero(date.getMinutes());
    var s = padWithZero(date.getSeconds());
    return h + ":" + m + ":" + s;
}

function kToF(t, decimals) {
    // Do some math and round to two decimal places.
    return (t * 9 / 5 - 459.67).toFixed(decimals);
}

function kToC(t, decimals) {
    return (t - 273.15).toFixed(decimals);
}