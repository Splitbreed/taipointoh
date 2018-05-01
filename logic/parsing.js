var config  = require('../config.json');
var youTube = require('./youtubeLogic.js');
var miscLog = require('./miscLogic.js');

var message, command;

function prefixCheck(msg, client){
  message = msg.content.split(" ");
  if (message[0].charAt(0) == `${config.nfo.prefix}`){
    command = message[0].substr(1);
    commandCheck(message, command, msg, client);
  }
}

function commandCheck(content, cmd, msg, client){
  switch(cmd){
    case "yt":
      content.splice(0,1);
      content = content.join(' ');
      youTube.search(content, msg, client);
    break;

    case "volume":
      content.splice(0,1);
      if (content.length < 2){
        youTube.volumeReport(msg, client);
        return;
      } else {
        content = content.join('');
        youTube.vol(content, msg, client);
      }
    break;

    case "help":
      miscLog.help(msg, client);
    break;

    default:
    break;

  }
}

module.exports = {
  prefixCheck : prefixCheck
}
