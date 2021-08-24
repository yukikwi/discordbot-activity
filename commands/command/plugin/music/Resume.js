const { getPlayer, setPlay } = require('./Store')

module.exports = (VoiceChannel) =>{
    getPlayer(VoiceChannel.guild.id).unpause()
    setPlay(VoiceChannel.guild.id, true)
}