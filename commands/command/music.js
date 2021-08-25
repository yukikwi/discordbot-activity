'use strict';
const required_args = {
    default: 1,
    play: 2,
    suggest: 2
}

const play = require('./plugin/music/Play')
const stop = require('./plugin/music/Stop')
const resume = require('./plugin/music/Resume')
const pause = require('./plugin/music/Pause')
const skip = require('./plugin/music/Skip')
const suggest = require('./plugin/music/Suggest')

const proc = async (client, message, args) => {

    // Find voice channel
    if (message.member.voice.channelId === null) {
      return message.channel.send("Join voice first.");
    }
    else{
        let VoiceChannel = client.channels.cache.get(message.member.voice.channelId)
        if(args[0] === 'play'){
            play(VoiceChannel, args[1], message)
        }
        else if(args[0] === 'stop'){
            stop(VoiceChannel, message)
        }
        else if(args[0] === 'resume'){
            resume(VoiceChannel, message)
        }
        else if(args[0] === 'pause'){
            pause(VoiceChannel, message)
        }
        else if(args[0] === 'skip'){
            skip(VoiceChannel, message)
        }
        else if(args[0] === 'suggest'){
            suggest(VoiceChannel, args[1], message)
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