'use strict';
const required_args = {
    default: 1,
    play: 2
}

const play = require('./plugin/music/Play')
const stop = require('./plugin/music/Stop')
const resume = require('./plugin/music/Resume')
const pause = require('./plugin/music/Pause')

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
        else if(args[0] === 'stop'){
            stop(VoiceChannel)
        }
        else if(args[0] === 'resume'){
            resume(VoiceChannel)
        }
        else if(args[0] === 'pause'){
            pause(VoiceChannel)
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