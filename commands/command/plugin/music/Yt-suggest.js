const axios = require('axios')
const youtube_api_key = process.env.YOUTUBE_API_KEY

const YTsuggest = async (video_id, n = 0) => {
  const result = await axios.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults='+(n+5)+'&relatedToVideoId='+video_id+'&type=video&key='+youtube_api_key, {
    headers: {
      Accept: 'application/json'
    }
   })

  return result.data.items
}

module.exports = YTsuggest