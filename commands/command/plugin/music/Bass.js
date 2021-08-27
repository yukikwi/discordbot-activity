const { setBass, AudioPlayer_exist, createConfig } = require('./Store')

module.exports = (VoiceChannel, bassConfig, message) =>{
    if(AudioPlayer_exist(VoiceChannel.guild.id) === false){
        createConfig(VoiceChannel.guild.id)
    }
    setBass(VoiceChannel.guild.id, (bassConfig === 'on'))
    message.channel.send("Bass set to "+ ((bassConfig === 'on')? "on":"off") +", effect in next song");
}