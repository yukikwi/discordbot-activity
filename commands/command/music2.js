'use strict';
const required_args = {
    default: 1,
    play: 2,
    eq: 2
}

const play = require('./plugin/music2/Play')
const eq = require('./plugin/music2/Eq')
const pause = require('./plugin/music2/Pause')
const resume = require('./plugin/music2/Resume')

const proc = async (client, message, args) => {

    // Find voice channel
    if (message.member.voice.channelId === null) {
      return message.channel.send("Join voice first.");
    }
    else{
        if(args[0] === 'play'){
            play(client, args[1], message)
        }
        else if(args[0] === 'eq'){
            eq(client, args[1], message)
        }
        else if(args[0] === 'pause'){
            pause(client, args[1], message)
        }
        else if(args[0] === 'resume'){
            resume(client, args[1], message)
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