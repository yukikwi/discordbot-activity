const join = require('./Join')
const { AudioPlayerStatus } = require('@discordjs/voice');
const { ModulecreatePlayer, SubscriptionPlayer } = require('./CreateAudioPlayer')
const { addQueue, getPlayer, getSong, isPlay, setPlay } = require('./Store')
const ytdl = require('./Ytdl-download')

const InitialPlay = (VoiceChannel, VoiceConnection) => {
    const stream = ytdl(getSong(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).play(stream)
    setPlay(VoiceChannel.guild.id, true)
    SubscriptionPlayer(VoiceConnection, getPlayer(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).on(AudioPlayerStatus.Idle, () => {
        const nextSong = getSong(VoiceChannel.guild.id)
        if(nextSong !== false){
            const stream = ytdl(nextSong)
            getPlayer(VoiceChannel.guild.id).play(stream)
        }
        else{
            VoiceConnection.destroy()
        }
    });
}

const Play = (VoiceChannel, url) => {
    const VoiceConnection = join(VoiceChannel)
    ModulecreatePlayer(VoiceChannel, VoiceConnection)
    addQueue(VoiceChannel.guild.id, url)
    if(isPlay(VoiceChannel.guild.id) === false){
        InitialPlay (VoiceChannel, VoiceConnection)
    }
    // else -> wait Idie load
}

module.exports = Play