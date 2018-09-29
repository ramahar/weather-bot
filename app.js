
require('dotenv').config();
//Slack bot Authentication Key
const token = process.env.SLACK_BOT_TOKEN;
//Slack API Modules
const {RtmClient, WebClient, CLIENT_EVENTS, RTM_EVENTS} = require('@slack/client');
//Import Module for OpenWeatherMap API Calls
const owm = require('./OWMCaller.js');

const appData = {};
//RealTimeMessaging Client
const rtm = new RtmClient(token,{
  dataStore : false,
  useRtmConnect : true
});

var BOT_ID_REGEX;
var BOT_DIRECT_CHANNEL_REGEX = /^D[A-Z0-9]+$/;
//Instance of a Web Client
const web = new WebClient(token);
var botChannels = [];


// RTM.AUTHENTICATED listener for successful authentication
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED,(connectData) => {
  //Store the self and team data
  appData.selfId = connectData.self.id;
  appData.selfName = connectData.self.name;
  appData.teamId = connectData.team.id;
  appData.teamName = connectData.team.name;
  BOT_ID_REGEX = new RegExp(`^<@${appData.selfId}>\\s`);
  console.log(`logged in as ${appData.selfName} [${appData.selfId}] on ${appData.teamName} [${appData.teamId}]`);
});


rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  console.log(`Ready to send & receive!`);
  let channelList = web.channels.list();
  channelList.then((response) => {
    console.log("--------------------[Channels]--------------------");
    for(let channel of response.channels){
      if (channel.is_member === true){
        botChannels.push(channel);
        console.log(channel.name);
      }
    }
    console.log("--------------------------------------------------");
    if(!botChannels.length) console.log("Bot-user is not in any channels! Consider adding the bot-user to some channels");
  });
});


  // RTM_EVENTS listener to receive channel messages

rtm.on(RTM_EVENTS.MESSAGE, (message) => {
   if ( (message.subtype && message.subtype === 'bot_message') ||
        (!message.subtype && message.user === appData.selfId) ) {
     return;
   }
  //Accepts message events from bot
  else if(BOT_ID_REGEX.exec(message.text) !== null || BOT_DIRECT_CHANNEL_REGEX.exec(message.channel)){
    //Get cityName from message.text to make API call
    var cityName = BOT_ID_REGEX[Symbol.replace](message.text,'');
    owm.getWeather(cityName,(response)=>{
      console.log(response);
      rtm.sendMessage(response, message.channel);
    });
    return;
  }

});

//Start the RTM Client
rtm.start();
