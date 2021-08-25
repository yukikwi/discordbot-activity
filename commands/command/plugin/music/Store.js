let AudioPlayer = {}

const createPlayer = (guild_id, Player, voiceConnection) => {
    AudioPlayer[guild_id] = {
        voiceconnection: voiceConnection,
        currentPlay: '',
        player: Player,
        pause: true,
        stop: false,
        queue: []
    }
}

const AudioPlayer_exist = (guild_id) => {
    return (typeof(AudioPlayer[guild_id]) === 'undefined')? false : getPlayer(guild_id)
}

const getPlayer = (guild_id) => {
    return AudioPlayer[guild_id].player
}

const getVC = (guild_id) => {
    return AudioPlayer[guild_id].voiceconnection
}

const addQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue.push(songUrl)
}

const clearQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue = []
}

const destroyPlayer =  (guild_id) => {
    delete AudioPlayer[guild_id]
    console.log(AudioPlayer)
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
    return AudioPlayer[guild_id].currentPlay = url
}

const QueueExist = (guild_id, url) => {
    return (AudioPlayer[guild_id].queue.indexOf(url) !== -1)? true:false
}

module.exports = {
    AudioPlayer_exist,
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
    QueueExist
}