// Register with openweathermap and get your API key.
var apikey = "2854c5771899ff92cd962dd7ad58e7b0";

// -----------------------------------------------------------------------
// 
// Initialize the app
// 
// -----------------------------------------------------------------------
// 
// Load weather for the city saved in local storage, if there is a one...
var savedCity = getCity();
// Check this city if nothing was saved it should be undefined.
if (savedCity != undefined) {
    // We saved a city load the weather!
    console.log("Loading Saved city:" + savedCity);
    loadWeatherForCity(savedCity);
} else {
    console.log("No saved city to load");
    $("body").addClass("no-weather");
}
// ----------------------------------------------------------------------




// ----------------------------------------------------------------------
// 
// Load weather for city
// 
// ----------------------------------------------------------------------
// Call this method with the city name to load weather for that city

function loadWeatherForCity(city) {
    var path = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
    // Use jQuery to load JSON data.
    $.get(path, loadWeather);
}

function loadWeatherForLocation() {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        var path = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
        console.log("Load weather for location:" + lat + " " + lon);
        $.get(path, loadWeather);
    });
}

function loadWeather(data) {
    // Make a path with the city and api key

    // Print the data to console. Go look at it right now!
    console.log(data);

    // Check for errors
    if (data.cod == 200) {
        // COD = 200 and everything is okay.
        $("body").removeClass("no-weather");
    } else {
        // Otherwise there was a problem hide UI stuff.
        $("body").addClass("no-weather");
        return
    }

    // Collect values from the json data and display it in each of the divs above.
    $("#lat").html(data.coord.lat);
    $("#lon").html(data.coord.lon);

    // data.weather array sometimes has more than one item!
    $("#weather-main").html(data.weather[0].main);
    $("#desc").html(data.weather[0].description);
    // * Use the icon name to load an image for the weather.
    $("#icon").html("<img src='weather-icons/" + data.weather[0].icon + ".svg'>");
    // For more info on icons and condition codes: https://openweathermap.org/weather-conditions

    // * Convert the temp from Kelvin to F or C.
    $("#temp").html(kToF(data.main.temp, 0));

    // * Convert these from K to T or C.
    $("#temp_min").html(kToF(data.main.temp_min, 0));
    $("#temp_max").html(kToF(data.main.temp_max, 0));

    $("#pressure").html(data.main.pressure);
    $("#humidity").html(data.main.humidity + "%");

    // Wind - These properties are some times missing. Check for undefined before displaying them!
    var windSpeed = data.wind.speed;
    var windDeg = data.wind.deg;
    var windGust = data.wind.gust;

    var wind = windSpeed + " mph";
    if (windDeg != undefined) {
        wind += " " + windDeg + "&deg;";
    }
    if (windGust != undefined) {
        wind += " " + windGust + " Gust"
    }

    $("#speed").html(wind);

    $("#clouds").html(data.clouds.all);
    $("#dt").html(new Date(data.dt * 1000).toDateString());
    $("#sunrise").html(formatAMPM(new Date(data.sys.sunrise * 1000)));
    $("#sunset").html(formatAMPM(new Date(data.sys.sunset * 1000)));
    $("#location-name").html(data.name);

    // Set background graient based on temp
    // var backgroundCSS = generateBackground(data.main.temp_min, data.main.temp_max, data.main.temp);
    // $("body").attr("style", backgroundCSS);

    // ***** Load five day forecast *****
    // Now that we have a location we can ask for a 5 day forecast.
    loadFiveDayForecast(data.coord.lat, data.coord.lon);
}

// ----------------------------------------------------------------------
// 
// Five day forecast
// 
// ----------------------------------------------------------------------
// Get the five day forecast for the lat and lon
function loadFiveDayForecast(lat, lon) {
    var path = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apikey;
    $.get(path, function (data) {
        console.log("-------- Five Day --------");
        // console.log(data.list);
        var cityName = data.city.name;
        var cityPop = data.city.sys.population;
        var list = [];
        var html = "";
        for (var i = 0; i < data.list.length; i++) {
            var obj = {};

            obj.clouds = data.list[i].clouds.all;
            obj.dt = new Date(data.list[i].dt * 1000).toDateString() + " " + formatAMPM(new Date(data.list[i].dt * 1000));
            obj.temp = kToF(data.list[i].main.temp);
            obj.temp_min = kToF(data.list[i].main.temp_min);
            obj.temp_max = kToF(data.list[i].main.temp_max);
            obj.grnd_level = data.list[i].main.grnd_level;
            obj.humidity = data.list[i].main.humidity;
            obj.pressure = data.list[i].main.pressure;
            obj.description = data.list[i].weather[0].description;
            obj.icon = data.list[i].weather[0].icon;
            obj.shortDesc = data.list[i].weather[0].main;
            obj.windSpeed = data.list[i].wind.speed;
            obj.windDeg = data.list[i].wind.deg;
            list.push(obj);
            html += "<div class='three-hr'><span>" +
                obj.dt + "</span> <span>" +
                obj.temp + "&deg;</span> <div><span>Humidity: " +
                obj.humidity + "%</span> <span>" +
                obj.description + "</span></div></div>";
        }

        $("#five-day-forecast").html(html);
    });
}



// ------------------------------------------------------------------
//
// City Form and buttons
// 
// ------------------------------------------------------------------

// Handle submit of city form
$("#city-form").submit(function (event) {
    event.preventDefault();
    console.log("City form Submit");
    var city = $("#city-input").val();
    $(".city-form-container").removeClass("show");
    loadWeatherForCity(city);
});

// Handle the Save city button (looks like a heart)
$("#save-city-button").click(function (event) {
    event.preventDefault();
    var city = $("#city-input").val();
    saveCity(city);
});

// Handle the location button
$("#location-button").click(function () {
    $(".city-form-container").addClass("show");
});


// Check for Geo Location 
if ("geolocation" in navigator) {
    /* geolocation is available */
    console.log("Geo Location Available");
    $(".right-alert-button").html("Use Location");
} else {
    /* geolocation IS NOT available */
    console.log("Geo Location Unavailable");
    $(".right-alert-button").html("Cancel");
}

$(".right-alert-button").click(function (event) {
    event.preventDefault();
    console.log("Right alert button");
    $(".city-form-container").removeClass("show");
    if ("geolocation" in navigator) {
        loadWeatherForLocation();
    }
});

// ------------------------------------------------------------------




// ------------------------------------------------------------------
// 
// Save city to local storage
// 
// ------------------------------------------------------------------

function saveCity(cityName) {
    // Save the cityName to local storage with the key: weather-app
    localStorage.setItem("weather-app", cityName);
}

// Get the city name from local starage for the key: weather-app
function getCity() {
    // !!! This possibly returns null you must handle this!
    return localStorage.getItem("weather-app");
}
// ---------------------------------------------------------------




// --------------------------------------------------------------
// 
// Helper functions
// 
// --------------------------------------------------------------

// Adds a 0 in front of a digit if it is a single digit. 
// Use this for writing the time as 09:03
function padWithZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


// Get the time formatted from a date object. 
// 06:05:09
function getTimeFrom(date) {
    var h = padWithZero(date.getHours());
    var m = padWithZero(date.getMinutes());
    var s = padWithZero(date.getSeconds());
    return h + ":" + m + ":" + s;
}

// Get the formatted time for a date
// 09:08:05 am
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function getDayFor(date) {
    var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    var dayIndex = date.getDay();
    return days[dayIndex];
}

var d = new Date();
console.log(d);
console.log(getTimeFrom(d));
console.log(formatAMPM(d));
console.log(getDayFor(d));




// Convert temp kelvin to Fahrenheit
function kToF(t, decimals) {
    // Do some math and round to two decimal places.
    return (t * 9 / 5 - 459.67).toFixed(decimals);
}

// Convert temp Kelvin to Celsius 
function kToC(t, decimals) {
    return (t - 273.15).toFixed(decimals);
}


//******************************************
// Prevent scroll on mobile
$(document).on('touchmove', function (event) {
    event.preventDefault();
    console.log("touch move");
});

$(document).on('touchstart', function (event) {
    console.log("touch start");
});

$(document).on('touchend', function (event) {
    console.log("touch end!");

});









// ****************************************************************************
// Unsuccesful attempt to convert temp to color values and generate a gradient. 

// https://gist.github.com/paulkaplan/5184275
// From http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
// Start with a temperature, in Kelvin, somewhere between 1000 and 40000.  (Other values may work,
//  but I can't make any promises about the quality of the algorithm's estimates above 40000 K.)

function colorTemperatureToRGB(kelvin) {
    var temp = kelvin / 1;
    var red, green, blue;

    if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;

        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
        blue = 255;
    }

    return {
        r: Math.round(clamp(red, 0, 255)),
        g: Math.round(clamp(green, 0, 255)),
        b: Math.round(clamp(blue, 0, 255))
    }
}

function clamp(x, min, max) {
    if (x < min) {
        return min;
    }
    if (x > max) {
        return max;
    }
    return x;
}



function makeRGBACSSStr(rgb) {
    return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",1)";
}

// Generate Background Gradient
function generateBackground(minTemp, maxTemp, currentTemp) {
    var minRGB = colorTemperatureToRGB(1) //Number(minTemp));
    var midRGB = colorTemperatureToRGB(60) //currentTemp);
    var maxRGB = colorTemperatureToRGB(1000) //maxTemp);

    console.log(minRGB);

    var minColor = makeRGBACSSStr(minRGB);
    var midColor = makeRGBACSSStr(midRGB);
    var maxColor = makeRGBACSSStr(maxRGB);

    var cssStr = "background-image: -webkit-linear-gradient(" + minColor + " 0%, " + midColor + " 43%, " + maxColor + " 100%);" + "background-image: -o-linear-gradient(" + minColor + " 0%, " + midColor + " 43%, " + maxColor + " 100%);" + "background-image: linear-gradient(" + minColor + " 0%, " + midColor + " 43%, " + maxColor + " 100%);"

    return cssStr;
}


// ----------------------------------------
// 
// Snap screen as they slide left and right
// 
// ----------------------------------------
var delay = 1000;
var timeout = null;
$(".wrapper").on('scroll', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
        var x = $(".wrapper").scrollLeft();
        var w2 = $(".wrapper").width() / 2;
        var newX = Math.round(x / w2) * w2;
        $(".wrapper").animate({
            scrollLeft: newX + "px"
        }, 200);
    }, delay);
});





