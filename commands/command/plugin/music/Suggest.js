const YTsuggest = require('./Yt-suggest')
const { addQueue, getCurrentPlay, AudioPlayer_exist, QueueExist } = require('./Store')
const ytdlCore = require('ytdl-core')

const YouTubeGetID = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

const Suggest = async (VoiceChannel, n, message) => {
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        let vid = (YouTubeGetID(getCurrentPlay(VoiceChannel.guild.id)))
        for(let i = 1; i <= n; i++){
            const Suggest_VID = await YTsuggest(vid)
            let sug_index = 0
            let url = 'https://www.youtube.com/watch?v=' + Suggest_VID[sug_index].id.videoId
            while(QueueExist(VoiceChannel.guild.id, url)){
                sug_index = sug_index + 1
                url = 'https://www.youtube.com/watch?v=' + Suggest_VID[sug_index].id.videoId
            }
            addQueue(VoiceChannel.guild.id, url)
            message.channel.send("Suggest song: " + Suggest_VID[sug_index].snippet.title + "["+url+"]")
            vid = Suggest_VID[sug_index].id.videoId
        }
    }
    else{
        message.channel.send("Play music first");
    }
}

module.exports = Suggest