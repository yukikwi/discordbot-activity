const { StreamType } = require('@discordjs/voice');
const join = require('./Join')
const { ModulecreatePlayer, SubscriptionPlayer } = require('./CreateAudioPlayer')
const { getPlayer } = require('./Store')
const ytdl = require('./Ytdl-download')

module.exports = (VoiceChannel, url) => {
    const VoiceConnection = join(VoiceChannel)
    ModulecreatePlayer(VoiceChannel, VoiceConnection)
    const stream = ytdl(url)
    getPlayer(VoiceChannel.guild.id).play(stream)
    SubscriptionPlayer(VoiceConnection, getPlayer(VoiceChannel.guild.id))
}