const { createAudioResource, StreamType } = require('@discordjs/voice');
const { getBass } = require('./Store')
const ytdl = require("ytdl-core");
const prism = require('prism-media');

module.exports = (url, guild_id) => {
    let FFMPEG_args = [
        '-analyzeduration', '0',
        '-loglevel', '0',
        '-f', 's16le',
        '-ar', '48000',
        '-ac', '2',
    ]
    if(getBass(guild_id) === true){
        console.log('Bass add to pipe')
        FFMPEG_args.push('-af')
        FFMPEG_args.push('bass=g=3:f=110:w=0.6')
    }
    const transcoder = new prism.FFmpeg({
        args: FFMPEG_args
    });
    const stream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio'
    }).pipe(transcoder).pipe(new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 }))
    return createAudioResource(stream, { inputType: StreamType.Opus })
}