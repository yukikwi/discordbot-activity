let AudioPlayer = {}

const createPlayer = (guild_id, Player, voiceConnection) => {
    AudioPlayer[guild_id] = {
        voiceconnection: voiceConnection,
        player: Player,
        pause: true,
        queue: []
    }
}

const AudioPlayer_exist = (guild_id) => {
    return (typeof(AudioPlayer[guild_id]) === 'undefined')? false : getPlayer(guild_id)
}

const getPlayer = (guild_id) => {
    return AudioPlayer[guild_id].player
}

const addQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue.push(songUrl)
}

const clearQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue = []
}

const destroyPlayer =  (guild_id) => {
    return delete AudioPlayer[guild_id]
}

const isPlay = (guild_id) => {
    return !AudioPlayer[guild_id].pause
}

const setPlay = (guild_id, status) => {
    AudioPlayer[guild_id].pause = !status
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

module.exports = {
    AudioPlayer_exist,
    createPlayer,
    getPlayer,
    addQueue,
    clearQueue,
    destroyPlayer,
    isPlay,
    setPlay,
    getSong,
    setQueue,
    getQueue
}