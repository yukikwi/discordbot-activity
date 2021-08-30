const join = require('./Join')
const { AudioPlayerStatus } = require('@discordjs/voice');
const { ModulecreatePlayer, SubscriptionPlayer } = require('./CreateAudioPlayer')
const { addQueue, getPlayer, getSong, isPlay, setPlay, destroyPlayer, isStop, setCurrentPlay, QueueCount, getBass } = require('./Store')
const ytdl = require('./Ytdl-download')
const yt = require('./Yt-search')
const ytdlCore = require('ytdl-core')

const InitialPlay = async (VoiceChannel, VoiceConnection, message) => {
    // const stream = await ytdl(getSong(VoiceChannel.guild.id).url, VoiceChannel.guild.id)
    const stream = await ytdl(getSong(VoiceChannel.guild.id).url, VoiceChannel.guild.id)
    if(process.env.DEBUG === '1')
        console.log('set stream bitrate: ' + VoiceChannel.bitrate/1000 +'kbps')
    stream.encoder.setBitrate(VoiceChannel.bitrate)
    getPlayer(VoiceChannel.guild.id).play(stream)
    setPlay(VoiceChannel.guild.id, true)
    SubscriptionPlayer(VoiceConnection, getPlayer(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).on(AudioPlayerStatus.Idle, async () => {

        if(process.env.DEBUG === '1')
            console.log('Player set to IDIE by event')
        
        if(isStop(VoiceChannel.guild.id) === false){
            const nextSong = getSong(VoiceChannel.guild.id)
            if(nextSong !== false){
                if(process.env.DEBUG === '1')
                    console.log('Next song is: ' + nextSong)
                if(!getBass(VoiceChannel.guild.id)){
                    message.channel.send("> ** :play_pause: Play next song: **" + nextSong.title +" (Bass off)")
                }
                else{
                    message.channel.send("> ** :play_pause: Play next song: **" + nextSong.title)
                }
                setCurrentPlay(VoiceChannel.guild.id, nextSong.url)
                const stream = await ytdl(nextSong.url, VoiceChannel.guild.id).encoder.setBitrate(VoiceChannel.bitrate)
                getPlayer(VoiceChannel.guild.id).play(stream)
            }
            else{
                if(process.env.DEBUG === '1')
                    console.log('destroyPlayer and keep config')

                destroyPlayer(VoiceChannel.guild.id)
                VoiceConnection.destroy()
            }
        }
        else {
            if(process.env.DEBUG === '1')
                console.log('Stop command detected')

            if( QueueCount(VoiceChannel.guild.id) === 0){
                if(process.env.DEBUG === '1')
                    console.log('No more song in queue -> destroyPlayer and keep config')

                destroyPlayer(VoiceChannel.guild.id)
                VoiceConnection.destroy()
            }
        }
    });

    // Player error
    getPlayer(VoiceChannel.guild.id).on('error', (e) => {
        console.log(e)
    })
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

    const title = (await ytdlCore.getBasicInfo(url)).videoDetails.title

    addQueue(VoiceChannel.guild.id, url, title)
    if(isPlay(VoiceChannel.guild.id) === false || ( isStop(VoiceChannel.guild.id) === true && QueueCount(VoiceChannel.guild.id) === 1)){
        setCurrentPlay(VoiceChannel.guild.id, url)
        
        if(!getBass(VoiceChannel.guild.id)){
            message.channel.send("> ** :play_pause: Play song: **" + title +" (Bass off)")
        }
        else{
            message.channel.send("> ** :play_pause: Play song: **" + title)
        }

        InitialPlay (VoiceChannel, VoiceConnection, message)
    }
    else {
        message.channel.send("> ** Add song: **" + title)
    }
}

module.exports = Play