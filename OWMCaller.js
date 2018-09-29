require('dotenv').config();
const request = require('request-promise');
//OpenWeatherMap API key
const OWM_API_KEY = process.env.OWM_API_KEY;
const OWM_UNIT_METRIC = 'metric';
const OWM_UNIT_IMPERIAL = 'imperial';
function getWeather(cityName, callback){
  //API call and the callback
  const options = {
    uri : 'http://api.openweathermap.org/data/2.5/weather',
    json: true,
    //Contains name of city, OpenWeatherMap API Key and units of the temperature
    qs: {
      q: cityName,
      APPID: '6d515fd08e375df4622c5918552c88a9',
      units: OWM_UNIT_METRIC
    }
  };

  request(options).
  then((response)=>{
    console.log(response);
    let result = "";
    //Get location information
    result += "Location: " + response.name + ", " + response.sys.country + "\n";
    
    //Get temperature information
    result += "Temperature: " + response.main.temp + " °C" + "\n";
    console.log("--[Success]--");
    callback(result);
    console.log("--------");
  }).catch((error)=>{
    console.log("--[OWM Error]--");
    callback(`Couldn't get weather information for '${cityName}'`);
    console.log("--------");
  });
}

module.exports.getWeather = getWeather;
