const { AudioPlayer_exist, getPlayer, setStop } = require('./Store')

module.exports = (VoiceChannel, message) => {
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        getPlayer(VoiceChannel.guild.id).stop()
        setStop(VoiceChannel.guild.id, true)
    }
    else{
        message.channel.send("Play music first");
    }
}