const { getPlayer, setPlay, AudioPlayer_exist } = require('./Store')

module.exports = (VoiceChannel, message) =>{
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        getPlayer(VoiceChannel.guild.id).pause()
        setPlay(VoiceChannel.guild.id, false)
    }
    else{
        message.channel.send("Play music first");
    }
}