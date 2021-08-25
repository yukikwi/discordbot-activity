const join = require('./Join')
const { AudioPlayerStatus } = require('@discordjs/voice');
const { ModulecreatePlayer, SubscriptionPlayer } = require('./CreateAudioPlayer')
const { addQueue, getPlayer, getSong, isPlay, setPlay, destroyPlayer, isStop } = require('./Store')
const ytdl = require('./Ytdl-download')
const yt = require('./Yt-search')

const InitialPlay = (VoiceChannel, VoiceConnection) => {
    const stream = ytdl(getSong(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).play(stream)
    setPlay(VoiceChannel.guild.id, true)
    SubscriptionPlayer(VoiceConnection, getPlayer(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).on(AudioPlayerStatus.Idle, () => {
        if(isStop(VoiceChannel.guild.id) === false){
            const nextSong = getSong(VoiceChannel.guild.id)
            if(nextSong !== false){
                const stream = ytdl(nextSong)
                getPlayer(VoiceChannel.guild.id).play(stream)
            }
            else{
                destroyPlayer(VoiceChannel.guild.id)
                VoiceConnection.destroy()
            }
        }
    });
}

const Play = async (VoiceChannel, keyword) => {
    const VoiceConnection = join(VoiceChannel)
    ModulecreatePlayer(VoiceChannel, VoiceConnection)
    let url = ''

    if(yt.isYTurl(keyword)){
        url = keyword
    }
    else{
        url = await yt.search(keyword)
    }

    addQueue(VoiceChannel.guild.id, url)
    if(isPlay(VoiceChannel.guild.id) === false){
        InitialPlay (VoiceChannel, VoiceConnection)
    }
    // else -> wait Idie load
}

module.exports = Play