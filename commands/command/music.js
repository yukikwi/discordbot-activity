'use strict';
const required_args = {
    default: 1,
    play: 2
}

const play = require('./plugin/music/Play')

const proc = async (client, message, args) => {

    // Find voice channel
    if (message.member.voice.channelId === null) {
      return message.channel.send("Join voice first.");
    }
    else{
        let VoiceChannel = client.channels.cache.get(message.member.voice.channelId)
        if(args[0] === 'play'){
            play(VoiceChannel, args[1])
        }
    }
}

const help = (message) => {
  return message.channel.send("Soon")
}

module.exports = {
    required_args,
    proc,
    help
}