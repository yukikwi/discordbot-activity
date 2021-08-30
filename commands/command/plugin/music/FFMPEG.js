const pathToFfmpeg = require('ffmpeg-static');
const shell = require('any-shell-escape')
const shelljs = require('shelljs')

module.exports = (input, output) => {
    const ffmpeg_script = shell([
        pathToFfmpeg, '-y', '-v', 'error',
        '-i', input,
        '-acodec', 'libopus',
        '-format', 'wav',
        '-ar', '48000',
        '-ab', '192k',
        '-ac', '2',
        '-af', 'firequalizer=gain_entry=\'entry(31,3);entry(62,1.5);entry(125,1);entry(500,-0.5);entry(1000,-0.5):delay=0.1:fixed=on:zero_phase=on\'',
        output
    ])
    if(process.env.DEBUG == 1)
        console.log('Run FFMPEG JOB')
    shelljs.exec(ffmpeg_script)
    if(process.env.DEBUG == 1)
        console.log('FFMPEG FINISH JOB')
}