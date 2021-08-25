const { getPlayer, setStop } = require('./Store')

module.exports = (VoiceChannel) =>{
    getPlayer(VoiceChannel.guild.id).stop()
    setStop(VoiceChannel.guild.id, true)
}