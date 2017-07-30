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
        // coords.html(data.coord.lat + " " + data.coord.lon);
        $("#lat").html(data.coord.lat);
        $("#lon").html(data.coord.lon);

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
        
        // Set background graient based on temp
        var backgroundCSS = generateBackground(data.main.temp_min, data.main.temp_max, data.main.temp);
        $("body").attr("style", backgroundCSS);
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

// Prevent scroll on mobile
$(document).on('touchmove', function(e) {
  e.preventDefault();
});



// https://gist.github.com/paulkaplan/5184275
// From http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
// Start with a temperature, in Kelvin, somewhere between 1000 and 40000.  (Other values may work,
//  but I can't make any promises about the quality of the algorithm's estimates above 40000 K.)

function colorTemperatureToRGB(kelvin){
    var temp = kelvin / 1;
    var red, green, blue;

    if( temp <= 66 ){
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        
        if( temp <= 19){
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492 );
        blue = 255;
    }

    return {
        r : Math.round(clamp(red,   0, 255)),
        g : Math.round(clamp(green, 0, 255)),
        b : Math.round(clamp(blue,  0, 255))
    }
}

function clamp( x, min, max ) {
    if(x<min){ return min; }
    if(x>max){ return max; }
    return x;
}

function makeRGBACSSStr(rgb) {
    return "rgba("+rgb.r+","+rgb.g+","+rgb.b+",1)";
}

// Generate Background Gradient
function generateBackground(minTemp, maxTemp, currentTemp) {
    var minRGB = colorTemperatureToRGB(1) //Number(minTemp));
    var midRGB = colorTemperatureToRGB(60) //currentTemp);
    var maxRGB = colorTemperatureToRGB(1000)    //maxTemp);
    
    console.log(minRGB);
    
    var minColor = makeRGBACSSStr(minRGB);
    var midColor = makeRGBACSSStr(midRGB);
    var maxColor = makeRGBACSSStr(maxRGB);
    
    var cssStr = "background-image: -webkit-linear-gradient("+minColor+" 0%, "+midColor+" 43%, "+maxColor+" 100%);"
    +"background-image: -o-linear-gradient("+minColor+" 0%, "+midColor+" 43%, "+maxColor+" 100%);"
    +"background-image: linear-gradient("+minColor+" 0%, "+midColor+" 43%, "+maxColor+" 100%);"
    
    return cssStr;
}
