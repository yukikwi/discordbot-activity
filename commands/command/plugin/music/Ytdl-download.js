const { createAudioResource, StreamType } = require('@discordjs/voice');
const { getBass } = require('./Store')
const ytdl = require("ytdl-core");
const prism = require('prism-media');
// const ffmpegScript = require('./FFMPEG')
// const {join} = require('path')
// const fs = require('fs')

// const saveYTDL = (stream, file) => {
//     return new Promise((resolve, reject) => {
//         const pipefs = fs.createWriteStream(file)
//         stream.pipe(pipefs)
//         pipefs.on('finish', () => {
//             if(process.env.DEBUG == 1)
//                 console.log('DL FINISH')
//                 resolve(true)
//         });
//     });
// }
  

module.exports = async (url, guild_id) => {
    let stream = ytdl(url, {
        filter: 'audioonly',
        quality: 'highestaudio'
    })
    let streaminputType = StreamType.Arbitrary

    if(getBass(guild_id) === true){
        if(process.env.DEBUG == 1)
            console.log('Bass on -> run ffmpeg')

        const FFMPEG_args = [
            '-analyzeduration', '0',
            '-loglevel', '0',
            '-f', 's16le',
            '-ar', '48000',
            '-ab', '192k',
            '-ac', '2',
            '-af', 'firequalizer=gain_entry=\'entry(31,3);entry(62,1.5);entry(125,1);entry(500,-0.5);entry(1000,-0.5):delay=0.1:fixed=on:zero_phase=on\'',
        ]

        const transcoder = new prism.FFmpeg({
            args: FFMPEG_args
        });

        stream = stream
        .pipe(transcoder)
        .pipe(new prism.opus.Encoder({ rate: 48000, channels: 2, frameSize: 960 }))

        if(process.env.DEBUG == 1){
            console.log('Use FFMPEG: ' + prism.FFmpeg.getInfo().version)
            console.log(`Using Opus module ${prism.opus.Encoder.type}`);
        }

        streaminputType = StreamType.Opus

        // New method save file as cache
        // Pipe ytdl result to file
        // if (!fs.existsSync(join(process.cwd(), 'cache/' + guild_id))){
        //     fs.mkdirSync(join(process.cwd(), 'cache/' + guild_id));
        // }
        // const file = join(process.cwd(), 'cache/'+guild_id+'/'+url.split('v=')[1]+'.webm')
        // const output = join(process.cwd(), 'cache/'+guild_id+'/'+url.split('v=')[1]+'_bass.webm')
        // await saveYTDL(stream, file)
        // // EQ
        // ffmpegScript(file, output)
        // stream = output

        // if(process.env.DEBUG == 1){
        //     console.log('Use FFMPEG: ' + prism.FFmpeg.getInfo().version)
        //     console.log(`Using Opus module ${prism.opus.Encoder.type}`);
        // }
        // streaminputType = StreamType.WebmOpus
    }
    
    
    return createAudioResource(stream, { inputType: streaminputType })
}