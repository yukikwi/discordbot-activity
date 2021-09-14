const { createAudioPlayer } = require('@discordjs/voice');
const { createPlayer, AudioPlayer_exist } = require('./Store')

const ModulecreatePlayer = (channel, voiceConnection) => {
    let player = null
    if(AudioPlayer_exist(channel.guild.id) === false){
        if(process.env.DEBUG === '1')
            console.log('AudioPlayer not found -> Initial...')
        
        player = createAudioPlayer();

        createPlayer(channel.guild.id, player, voiceConnection)
    }
    else{
        if(process.env.DEBUG === '1')
            console.log('AudioPlayer found -> Use old one...')
        player = AudioPlayer_exist(channel.guild.id)
    }
    return player
}

const SubscriptionPlayer = (voiceConnection, player) => {
    if(process.env.DEBUG === '1')
        console.log('Assign audio player to voice connection')
    const subscription = voiceConnection.subscribe(player);
    return subscription
}

module.exports = {
    ModulecreatePlayer,
    SubscriptionPlayer
}