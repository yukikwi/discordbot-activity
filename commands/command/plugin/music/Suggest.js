const YTsuggest = require('./Yt-suggest')
const { addQueue, getCurrentPlay, AudioPlayer_exist, QueueExist } = require('./Store')
const ytdlCore = require('ytdl-core')

const YouTubeGetID = (url) => {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
}

const delay = (ms) => { new Promise(resolve => setTimeout(resolve, ms)) }

const Suggest = async (VoiceChannel, n, message) => {
    if(AudioPlayer_exist(VoiceChannel.guild.id) !== false){
        let vid = (YouTubeGetID(getCurrentPlay(VoiceChannel.guild.id)))
        let suggestMSG = ''
        for(let i = 1; i <= n; i++){
            let Suggest_VID = await YTsuggest(vid)
            while(Suggest_VID === false){
                // Fix google api rate limit
                await delay(1000)
                Suggest_VID = await YTsuggest(vid)
            }
                let sug_index = 0
                let url = 'https://www.youtube.com/watch?v=' + Suggest_VID[sug_index].id.videoId
                while(QueueExist(VoiceChannel.guild.id, url) || url === getCurrentPlay(VoiceChannel.guild.id) || typeof(Suggest_VID[sug_index].snippet) === 'undefined'){
                    sug_index = sug_index + 1
                    url = 'https://www.youtube.com/watch?v=' + Suggest_VID[sug_index].id.videoId
                    if(sug_index % 5 === 1){
                        Suggest_VID = await YTsuggest(vid, sug_index)
                    }
                }
                addQueue(VoiceChannel.guild.id, url, Suggest_VID[sug_index].snippet.title)
                suggestMSG = suggestMSG + "> ** :bulb: Suggest song add to queue: **" + Suggest_VID[sug_index].snippet.title + "["+url+"] \n"
                vid = Suggest_VID[sug_index].id.videoId
        }
        message.channel.send(suggestMSG);
    }
    else{
        message.channel.send("Play music first");
    }
}

module.exports = Suggest