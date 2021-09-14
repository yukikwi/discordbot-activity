let AudioPlayer = {}

const createConfig = (guild_id) => {
    if(typeof (AudioPlayer[guild_id]) === 'undefined'){
        if(process.env.DEBUG === '1')
            console.log('Store: config not found -> Regenerating... ')
        AudioPlayer[guild_id] = {
            currentPlay: '',
            pause: true,
            stop: false,
            bass: true,
            queue: []
        }
    }
}

const createPlayer = (guild_id, Player, voiceConnection) => {
    createConfig(guild_id)
    console.log('Store: set player and voice connection ')
    AudioPlayer[guild_id].player = Player
    AudioPlayer[guild_id].voiceconnection = voiceConnection
}

const AudioPlayer_exist = (guild_id) => {
    return (typeof(AudioPlayer[guild_id]) === 'undefined' || typeof(AudioPlayer[guild_id].player) === 'undefined')? false : getPlayer(guild_id)
}

const getPlayer = (guild_id) => {
    return AudioPlayer[guild_id].player
}

const getVC = (guild_id) => {
    return AudioPlayer[guild_id].voiceconnection
}

const addQueue = (guild_id, songUrl, songTitle) => {
    AudioPlayer[guild_id].queue.push({
        title: songTitle,
        url: songUrl
    })
}

const clearQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue = []
}

const destroyPlayer =  (guild_id) => {
    
    delete AudioPlayer[guild_id].player
    AudioPlayer[guild_id].currentPlay = ''
    AudioPlayer[guild_id].pause = true,
    AudioPlayer[guild_id].stop = false
    AudioPlayer[guild_id].queue = []
}

const isPlay = (guild_id) => {
    return !AudioPlayer[guild_id].pause
}

const setPlay = (guild_id, status) => {
    AudioPlayer[guild_id].pause = !status
}

const isStop = (guild_id) => {
    return AudioPlayer[guild_id].stop
}

const setStop = (guild_id, status) => {
    AudioPlayer[guild_id].stop = status
}

const getSong = (guild_id) => {
    return (AudioPlayer[guild_id].queue.length === 0)? false : AudioPlayer[guild_id].queue.shift()
}

const setQueue = (guild_id, queue) => {
    AudioPlayer[guild_id].queue = queue
}

const getQueue = (guild_id) => {
    return AudioPlayer[guild_id].queue
}

const getCurrentPlay = (guild_id) => {
    return AudioPlayer[guild_id].currentPlay
}

const setCurrentPlay = (guild_id, url) => {
    AudioPlayer[guild_id].stop = false
    AudioPlayer[guild_id].currentPlay = url
}

const QueueExist = (guild_id, url) => {
    return (AudioPlayer[guild_id].queue.indexOf(url) !== -1)? true:false
}

const QueueCount = (guild_id) => {
    return AudioPlayer[guild_id].queue.length
}

const setBass = (guild_id, status) => {
    AudioPlayer[guild_id].bass = status
}

const getBass = (guild_id) => {
    return AudioPlayer[guild_id].bass
}

module.exports = {
    AudioPlayer_exist,
    createConfig,
    createPlayer,
    getPlayer,
    getVC,
    addQueue,
    clearQueue,
    destroyPlayer,
    isPlay,
    setPlay,
    isStop,
    setStop,
    getSong,
    setQueue,
    getQueue,
    getCurrentPlay,
    setCurrentPlay,
    QueueExist,
    QueueCount,
    setBass,
    getBass
}