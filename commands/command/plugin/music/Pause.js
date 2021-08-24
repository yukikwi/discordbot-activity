const { getPlayer, setPlay } = require('./Store')

module.exports = (VoiceChannel) =>{
    getPlayer(VoiceChannel.guild.id).pause()
    setPlay(VoiceChannel.guild.id, false)
}