const { createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const { createPlayer, AudioPlayer_exist } = require('./Store')

const ModulecreatePlayer = (channel, voiceConnection) => {
    let player = null
    if(AudioPlayer_exist(channel.guild.id) === false){
        player = createAudioPlayer();

        createPlayer(channel.guild.id, player, voiceConnection)
    }
    else{
        player = AudioPlayer_exist(channel.guild.id)
    }
    return player
}

const SubscriptionPlayer = (voiceConnection, player) => {
    const subscription = voiceConnection.subscribe(player);
    return subscription
}

module.exports = {
    ModulecreatePlayer,
    SubscriptionPlayer
}