const { createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const prism = require('prism-media');

module.exports = (url) => {
    const transcoder = new prism.FFmpeg({
        args: [
        '-analyzeduration', '0',
        '-loglevel', '0',
        '-f', 's16le',
        '-ar', '48000',
        '-ac', '2',
        '-af', "bass=g=3:f=110:w=0.6",
        ]
    });
    const stream = ytdl(url, {
        filter: 'audioonly',
        type: 'opus',
        quality: 'highestaudio'
    }).pipe(transcoder).pipe(new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 }))
    return createAudioResource(stream, { inputType: StreamType.Opus })
}