'use strict';
const fs = require('fs');

const proc = (client, message, args) => {
    require("discordjs-activity")(client)
    const Activitys = JSON.parse(fs.readFileSync('./config/activity.json'));

    // Find matching
    const Activity = Activitys.find(item => {
        return item.name === args[0]
    })

    // Find voice channel
    let subscription = subscriptions.get(interaction.guildId);
    if (!subscription) {
        message.channel.send("Join voice first.");
    }
    else{

    }
    let VoiceChannel = client.channels.cache.get("Voice Channel ID")
    let Invite = await VoiceChannel.activityInvite(Activity.app_id)
    message.channel.send("https://discord.com/invite/"+Invite.code)
}
