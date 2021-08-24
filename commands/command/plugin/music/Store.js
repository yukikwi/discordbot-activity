let AudioPlayer = {}

const createPlayer = (guild_id, Player, voiceConnection) => {
    AudioPlayer[guild_id] = {
        voiceconnection: voiceConnection,
        player: Player,
        queue: []
    }
}

const getPlayer = (guild_id) => {
    return AudioPlayer[guild_id].player
}

const addQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue.append(songUrl)
}

const clearQueue = (guild_id, songUrl) => {
    AudioPlayer[guild_id].queue = []
}

module.exports = {
    createPlayer,
    getPlayer,
    addQueue,
    clearQueue
}