const { createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require("ytdl-core");

module.exports = (url) => {
    const stream = ytdl(url, { filter: 'audioonly' });
    return createAudioResource(stream, { inputType: StreamType.Arbitrary })
}