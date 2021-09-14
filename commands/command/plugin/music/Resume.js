const { getPlayer, setPlay, isStop, setStop, getVC, getSong, destroyPlayer, AudioPlayer_exist } = require('./Store')
const ytdl = require('./Ytdl-download')

module.exports = (VoiceChannel, message) =>{
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        if(isStop(VoiceChannel.guild.id) === true){
            setStop(VoiceChannel.guild.id, false)
            const nextSong = getSong(VoiceChannel.guild.id)
            if(nextSong !== false){
                const stream = ytdl(nextSong.url, VoiceChannel.guild.id)
                message.channel.send("Play song: " + nextSong.title)
                getPlayer(VoiceChannel.guild.id).play(stream)
            }
            else{
                destroyPlayer(VoiceChannel.guild.id)
                getVC(VoiceChannel.guild.id).destroy()
            }
        }
        else{
            getPlayer(VoiceChannel.guild.id).unpause()
            setPlay(VoiceChannel.guild.id, true)
        }
    }
    else{
        message.channel.send("Play music first");
    }
}