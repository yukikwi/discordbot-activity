let Store = []

const createStore = (guild_id) => {
    Store[guild_id] = {
        eq: '',
        queue: null,
        playing: false
    }
}

const seteq = (guild_id, eq) => {
    if(typeof(Store[guild_id]) === 'undefined')
        createStore(guild_id)
    Store[guild_id].eq = eq
    return true
}

const loadeq = (guild_id) => {
    if(typeof(Store[guild_id]) === 'undefined')
        createStore(guild_id)
    return Store[guild_id].eq
}

const setQueue = (guild_id, queue) => {
    if(typeof(Store[guild_id]) === 'undefined')
        createStore(guild_id)
    Store[guild_id].queue = queue
    return true
}

const loadQueue = (guild_id) => {
    if(typeof(Store[guild_id]) === 'undefined')
        createStore(guild_id)
    return Store[guild_id].queue
}

const setPlaying = (guild_id, playing) => {
    if(typeof(Store[guild_id]) === 'undefined')
        createStore(guild_id)
    Store[guild_id].playing = playing
    return true
}

const loadPlaying = (guild_id) => {
    if(typeof(Store[guild_id]) === 'undefined')
        createStore(guild_id)
    return Store[guild_id].playing
}

module.exports = {
    seteq,
    loadeq,
    setQueue,
    loadQueue,
    setPlaying,
    loadPlaying
}