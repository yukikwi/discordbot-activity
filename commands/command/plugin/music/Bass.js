const { setBass, AudioPlayer_exist } = require('./Store')

module.exports = (VoiceChannel, bassConfig, message) =>{
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        setBass(VoiceChannel.guild.id, (bassConfig === 'on'))
        message.channel.send("Bass set to "+ ((bassConfig === 'on')? "on":"off") +", effect in next song");
    }
    else{
        message.channel.send("Play music first");
    }
}