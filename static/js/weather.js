 /* global $ */
var xhr = new XMLHttpRequest();
var apiKey = '&appid=f184ae1290f9c405bd84c12d1b76f8c7';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

function getWeatherData(cb) { //Get weather data from api 

var currentCity = $('#address').val();
var findCharacterComma = ",";
var findCharacterHyphen = "-";

if ( currentCity.indexOf(findCharacterComma) > -1 ) { // To fix errors when calling api, sends everything before the first comma
    var parsedCity = currentCity.substring(0, currentCity.indexOf(","));

} else if ( currentCity.indexOf(findCharacterHyphen) > -1 ) { // To fix errors when calling api, sends everything before the first hyphen
    var parsedCity = currentCity.substring(0, currentCity.indexOf("-"));
}

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) { //If the api finds the area
        cb(JSON.parse(this.responseText));
    }
    else if (this.status== 404) { //If the api cannot find the area 
           $(".sun-shower, .thunder-storm, .cloudy, .flurries, .sunny, .rainy").css("display", "none"); // Clears any icons from previous searches
           $("#weatherdata").html('Weather data cannot be found for this destination');
        
    }
};

xhr.open("GET", apiUrl + parsedCity + apiKey);
xhr.send();

}
        

function writeTheWeather() { // Work with Json Data returned for area
    getWeatherData(function(data) {
        
        $(".sun-shower, .thunder-storm, .cloudy, .flurries, .sunny, .rainy").css("display", "none"); // Clears any icons from previous searches
        
        if ([data.weather[0].main] == "Clouds" || [data.weather[0].main] == "Fog"|| [data.weather[0].main] =="Mist") {// Displays the correct icon an alert background colour depending on the weather
            $(".cloudy").css("display", "block");
            $("#weatherdata").attr('class', 'alert alert-secondary col-sm-4 mx-auto text-center');
            
        } else if ([data.weather[0].main] == "Clear") { 
            $(".sunny").css("display", "block");
            $("#weatherdata").attr('class', 'alert alert-warning col-sm-4 mx-auto text-center');
           
        } else if ([data.weather[0].main] == "Drizzle") { 
            $(".sun-shower").css("display", "block");
            $("#weatherdata").attr('class', 'alert alert-primary col-sm-4 mx-auto text-center');
        
        } else if ([data.weather[0].main] == "Rain") { 
            $(".rainy").css("display", "block");
            $("#weatherdata").attr('class', 'alert alert-dark col-sm-4 mx-auto text-center');
        
        } else if ([data.weather[0].main] == "Thunderstorm") { 
            $(".thunder-storm").css("display", "block");
            $("#weatherdata").attr('class', 'alert alert-danger col-sm-4 mx-auto text-center');
        
        } else if ([data.weather[0].main] == "Snow") { 
            $(".flurries").css("display", "block");
            $("#weatherdata").attr('class', 'alert alert-light col-sm-4 mx-auto text-center');
        
        } else if ([data.weather[0].main] ==  "Smoke"|| [data.weather[0].main] == "Haze"|| [data.weather[0].main] == "Dust"|| [data.weather[0].main] == "Sand"|| [data.weather[0].main] == "Dust"|| [data.weather[0].main] == "Ash"|| [data.weather[0].main] == "Squall"|| [data.weather[0].main] == "Tornado") { 
            $("#weatherdata").attr('class', 'alert alert-warning col-sm-4 mx-auto text-center');
        }
        // Adds the weather data in a readable response to the user
        $("#weatherdata").html('The weather for ' + data.name + ' is currently "' + data.weather[0].description + '" with a temperature currently at ' + Math.round(data.main.temp-273.15) + '&#8451 and a max temperature of ' + Math.round(data.main.temp_max-273.15) + '&#8451');
    });
}