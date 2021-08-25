const { getPlayer } = require('./Store')

module.exports = (VoiceChannel) =>{
    getPlayer(VoiceChannel.guild.id).stop()
}