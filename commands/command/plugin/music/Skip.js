const { getPlayer, AudioPlayer_exist } = require('./Store')

module.exports = (VoiceChannel, message) =>{
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        getPlayer(VoiceChannel.guild.id).stop()
    }
    else{
        message.channel.send("Play music first");
    }
}