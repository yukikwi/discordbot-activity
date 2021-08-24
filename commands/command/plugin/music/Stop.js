const { getPlayer, destroyPlayer } = require('./Store')

module.exports = (VoiceChannel) =>{
    getPlayer(VoiceChannel.guild.id).stop()
    destroyPlayer(VoiceChannel.guild.id)
}