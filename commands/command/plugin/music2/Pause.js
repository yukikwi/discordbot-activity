const Store = require('./Store')

module.exports = (client, song, message) => {
    const queue = Store.loadQueue(message.guildId)
    queue.setPaused(true)
}