const join = require('./Join')
const { AudioPlayerStatus } = require('@discordjs/voice');
const { ModulecreatePlayer, SubscriptionPlayer } = require('./CreateAudioPlayer')
const { getQueue, setQueue, getPlayer, getSong, isPlay, setPlay } = require('./Store')
const stop = require('./Stop')
const ytdl = require('./Ytdl-download')

const InitialPlay = (VoiceChannel, VoiceConnection) => {
    const stream = ytdl(getSong(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).play(stream)
    setPlay(VoiceChannel.guild.id, true)
    SubscriptionPlayer(VoiceConnection, getPlayer(VoiceChannel.guild.id))
    getPlayer(VoiceChannel.guild.id).on(AudioPlayerStatus.Idle, () => {
        const nextSong = getSong(VoiceChannel.guild.id)
        if(nextSong !== false){
            const stream = ytdl(getSong(VoiceChannel.guild.id))
            getPlayer(VoiceChannel.guild.id).play(stream)
        }
        else{
            connection.destroy()
        }
    });
}

const Skip = (VoiceChannel) => {
    let Current_Queue = getQueue(VoiceChannel.guild.id)
    stop(VoiceChannel)
    const VoiceConnection = join(VoiceChannel)
    ModulecreatePlayer(VoiceChannel, VoiceConnection)
    setQueue(VoiceChannel.guild.id, Current_Queue)
    InitialPlay (VoiceChannel, VoiceConnection)
}

module.exports = Skip