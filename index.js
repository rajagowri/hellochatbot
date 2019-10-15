const Slackbot = require('slackbots');
const axios = require('axios');

const bot = new Slackbot({
    token: 'xoxb-7197346258-765050693990-gibfn3mualI2Kvv6fFCts5pQ',
    name: 'installbot'
});

//start handler 
bot.on('start', function() {
    var params = {
        icon_emoji: ':smiley:'
    };
    bot.postMessageToChannel(
        'general', 
        'Get ready to install with @Installbot',
         params);
});

//Error Handler
bot.on('error', function(err){
    console.log(err);
});

//Message Handler
bot.on('message', function(data) {
 if(data.type !== 'message'){
     return;
 }
 handleMessage(data.text);
});

//Response to data 
function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckJoke();
    } else if(message.includes(' yomama')){
        yomamaJoke();
    } else if(message.includes(' random')){
        randomJoke();
    } else if(message.includes(' help')){
        runHelp();
    }
}

function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random').then(function(res){
         const joke= res.data.value.joke;

         var params = {
            icon_emoji: ':laughing:'
        };
        bot.postMessageToChannel(
            'general', 
            `Chuck Norris: ${joke}`,
             params);
     })
}
function yomamaJoke(){
    axios.get('http://api.yomomma.info').then(function(res){
         const joke= res.data.joke;

         var params = {
            icon_emoji: ':laughing:'
        };
        bot.postMessageToChannel(
            'general', 
            `YoMama: ${joke}`,
             params);
     })
}
function randomJoke(){
    const rand=Math.floor(Math.random()*2)+1;
    if(rand===1){
        chuckJoke();
    } else if(rand===2){
        yomamaJoke();
    }
}

function runHelp(){
    var params = {
        icon_emoji: ':question:'
    };
    bot.postMessageToChannel(
        'general', 
        `Type @Installbot with either 'chucknorris', 'yomama' or 'random' to get a joke`,
         params);
 }