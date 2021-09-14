
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = (channel) => {
    return joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfDeaf: true
    });
}