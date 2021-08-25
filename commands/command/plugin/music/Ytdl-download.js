const { createAudioResource, StreamType } = require('@discordjs/voice');
const { getBass } = require('./Store')
const ytdl = require("ytdl-core");
const prism = require('prism-media');

module.exports = (url, guild_id) => {
    const stream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio'
    })
    let inputType = StreamType.Arbitrary
    
    if(getBass(guild_id) === true){
        const FFMPEG_args = [
            '-analyzeduration', '0',
            '-loglevel', '0',
            '-f', 's16le',
            '-ar', '48000',
            '-ac', '2',
            '-af', 'bass=g=3:f=110:w=0.6'
        ]
        const transcoder = new prism.FFmpeg({
            args: FFMPEG_args
        });
        stream.pipe(transcoder).pipe(new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 }))
        inputType = StreamType.Opus
    }
    
    
    return createAudioResource(stream, { inputType: StreamType.Opus })
}