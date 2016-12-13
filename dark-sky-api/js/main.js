var appkey = "768e23ad0120d9dc9708dadcd7506083";
var path = "https://api.darksky.net/forecast/"+appkey+"/";



// Compile templates 
var weatherTemplate = Handlebars.compile($("#weather-template").html());


getLocation();

function getLocation() {
    if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(function (position) {
            getWeather(position.coords.latitude, position.coords.longitude);
        });
    } else {
        alert("Geo location is not available :(");
    }
}


function getWeather(lat, lon) {
    $.get(path+lat+","+lon, function (data) {
        console.log(data);
        
        var html = weatherTemplate(data);
        $("#app").html(html);
    });
}