const { createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require("ytdl-core");

module.exports = (url) => {
    const stream = ytdl(url, {
        filter: 'audioonly',
        type: 'opus',
        quality: 'highestaudio'
    });
    return createAudioResource(stream, { inputType: StreamType.Arbitrary })
}