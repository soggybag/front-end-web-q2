// ----------------------------------------
// 
// Favorite location
// 
// ----------------------------------------
/* An object that holds the current location */
var favoriteLocation = (function () {
    // Private methods 
    var locationName = undefined;

    // Get the city name from local starage for the key: weather-app
    function getCity() {
        var name = localStorage.getItem("weather-app");
        console.log("Favortie city name: "+name);
        if (name == null) {
            locationName = undefined;
        } else {
            locationName = name;
        }
    }

    function saveLocation() {
        localStorage.setItem("weather-app", cityName);
    }
    
    
    // Initialize
    getCity();

    // Public methods
    var obj = {};

    obj.getLocation = function () {
        return locationName;
    }
    
    obj.hasLocation = function() {
        return locationName == undefined ? false : true;
    }

    return obj;
})()


console.log(favoriteLocation.getLocation());
console.log(favoriteLocation.hasLocation());