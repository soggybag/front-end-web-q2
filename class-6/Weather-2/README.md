# Weather

This is a simple weather app created with HTML, CSS, JavaScript. 

As is the app has a few features of interest. 

- Gets the weather from [OpenWeatherMap.org](http://openweathermap.org) using their API.
    - Uses AJAX to load JSON data via jQuery's [$.get()](https://api.jquery.com/jquery.get/) method. 
    - Specifically this example uses both the [Current weather forecast](http://openweathermap.org/current) and the [5 day 3 hour forecast](http://openweathermap.org/forecast5). 
- Gets the geo location vis JS with [navigator.geolocation.getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- Stores a city location with local storage. 

# Example

![screenshot.gif](screenshot-gif)


## Dependencies

The project depends only on [jQuery](http://jquery.com).