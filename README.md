# Weather bot for Slack in NodeJS that uses OpenWeatherMap API
This is a bot for reporting weather information from OpenWeatherMap built on Slack's NodeJS SDK using:
- [Web](https://api.slack.com/web) API
- [Real Time Messaging (RTM)](https://api.slack.com/rtm) API
- [Events](https://api.slack.com/events-api) API
- [Node Slack SDK](https://github.com/slackapi/node-slack-sdk)

## Installation

### NodeJS & npm
Latest NodeJS and npm must be installed
After installation and verifying you have the latest version, you can create a new folder, **clone the repository**, and run your `npm install` to grab the dependencies.

### OpenWeatherMap API Key
The OpenWeatherMap-API docs provide information on how to further use the API

### Setting up the envrionment variables

Create a new file `.env` and add the following lines of text:
```
SLACK_BOT_TOKEN=<SECRET KEY HERE>
OWM_API_KEY=<OWM API KEY GOES HERE>
```

Start the application with `node app.js`


To indicate your location, simply provide the name of a town, city, country  
`@bot-name cityName`  
You can also specify the state or country using a commma proceeded by the country code:  
`@bot-name cityName,countryName`  




