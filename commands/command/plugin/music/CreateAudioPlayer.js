const { createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const { createPlayer, AudioPlayer_exist } = require('./Store')

const ModulecreatePlayer = (channel, voiceConnection) => {
    let player = null
    console.log('ModulecreatePlayer')
    console.log(AudioPlayer_exist(channel.guild.id))
    if(AudioPlayer_exist(channel.guild.id) === false){
        console.log('Create new player.............')
        player = createAudioPlayer();

        createPlayer(channel.guild.id, player, voiceConnection)
    }
    else{
        console.log('Use old player.............')
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