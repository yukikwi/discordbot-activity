const join = require('./Join')
const { AudioPlayerStatus } = require('@discordjs/voice');
const { ModulecreatePlayer, SubscriptionPlayer } = require('./CreateAudioPlayer')
const { addQueue, getPlayer, getSong, isPlay, setPlay, destroyPlayer, isStop, setCurrentPlay } = require('./Store')
const ytdl = require('./Ytdl-download')
const yt = require('./Yt-search')
const ytdlCore = require('ytdl-core')

const InitialPlay = (VoiceChannel, VoiceConnection, message) => {
    const stream = ytdl(getSong(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).play(stream)
    setPlay(VoiceChannel.guild.id, true)
    SubscriptionPlayer(VoiceConnection, getPlayer(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).on(AudioPlayerStatus.Idle, async () => {
        if(isStop(VoiceChannel.guild.id) === false){
            const nextSong = getSong(VoiceChannel.guild.id)
            if(nextSong !== false){
                message.channel.send("Play next song: " + (await ytdlCore.getBasicInfo(nextSong)).videoDetails.title)
                setCurrentPlay(VoiceChannel.guild.id, nextSong)
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

const Play = async (VoiceChannel, keyword, message) => {
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
    setCurrentPlay(VoiceChannel.guild.id, url)
    if(isPlay(VoiceChannel.guild.id) === false){
        message.channel.send("Play next song: " + (await ytdlCore.getBasicInfo(url)).videoDetails.title)
        InitialPlay (VoiceChannel, VoiceConnection, message)
    }
    else {
        message.channel.send("Add song: " + (await ytdlCore.getBasicInfo(url)).videoDetails.title)
    }
}

module.exports = Play