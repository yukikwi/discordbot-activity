const { VoiceConnectionStatus, AudioPlayerStatus, createAudioPlayer } = require('@discordjs/voice');
const join = require('./Join')

module.exports = (VoiceChannel) => {
    join(VoiceChannel)
}