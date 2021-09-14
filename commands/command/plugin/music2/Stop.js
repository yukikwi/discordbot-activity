const Store = require('./Store')

module.exports = (client, song, message) => {
    if(process.env.DEBUG === '1')
        console.log('Load queue from '+message.guildId)
    const queue = Store.loadQueue(message.guildId)
    queue.stop()
    Store.setQueue(message.guildId, null)
    Store.setPlaying(message.guildId, false)
}