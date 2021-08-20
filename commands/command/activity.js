'use strict';
const required_args = 1;
const activityInvite = require('./plugin/activity/ActivityInvite')

const Activitys = [
  {
      "name": "yt",
      "app_id": "755600276941176913"
  },
  {
      "name": "poker",
      "app_id": "755827207812677713"
  },
  {
      "name": "betrayal",
      "app_id": "773336526917861400"
  },
  {
      "name": "fishing",
      "app_id": "814288819477020702"
  },
  {
      "name": "chess",
      "app_id": "832012774040141894"
  }
]

const proc = async (client, message, args) => {

    // Find matching
    const Activity = Activitys.find(item => {
        return item.name === args[0]
    })

    // Find voice channel
    if (message.member.voice.channelId === null) {
      return message.channel.send("Join voice first.");
    }
    else{
        let VoiceChannel = client.channels.cache.get(message.member.voice.channelId)
        let Invite = await activityInvite(VoiceChannel, Activity.app_id)
        if(Invite.code !== 50013){
          return message.channel.send("https://discord.com/invite/"+Invite.code)
        }
        else{
          return message.channel.send("Internal error")
        }
    }
}

const help = (message) => {
  return message.channel.send("Support Activity: \n \
  - Youtube: yt \n \
  - Poker: poker \n \
  - Betrayal: betrayal \n \
  - Fishing: fishing \n \
  - Chess: chess \
  ")
}

module.exports = {
    required_args,
    proc,
    help
}