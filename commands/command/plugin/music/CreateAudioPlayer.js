const { createAudioPlayer, AudioPlayerStatus } = require('@discordjs/voice');
const { createPlayer } = require('./Store')

const ModulecreatePlayer = (channel, voiceConnection) => {
    const player = createAudioPlayer();

    createPlayer(channel.guild.id, player, voiceConnection)
    return player
}

const SubscriptionPlayer = (voiceConnection, player) => {
    const subscription = voiceConnection.subscribe(player);
    player.on(AudioPlayerStatus.Idle, () => connection.destroy());
    return subscription
}

module.exports = {
    ModulecreatePlayer,
    SubscriptionPlayer
}