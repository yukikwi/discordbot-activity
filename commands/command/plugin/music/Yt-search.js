const yts = require( 'yt-search' )

const isYTurl = (url) => {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return (url.match(p)) ? true : false;
}

const search = async (keyword) => {
    const video = await yts(keyword)
    return video.videos[0].url
}

module.exports = {
    isYTurl,
    search
}