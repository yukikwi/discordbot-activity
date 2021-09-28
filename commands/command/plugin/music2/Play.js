const { Player, AudioFilters } = require("discord-player");
const Store = require('./Store')
const { seteq } = require('./Eq')

const createPlayer = (client) => {
    if(process.env.DEBUG === '1')
        console.log('Create Player')

    const player = new Player(client, {
        ytdlOptions: {
            requestOptions: {
                headers: {
                    cookie: process.env.YT_COOKIE
                }
            }
        }
    });

    // Track event
    player.on("trackStart", (queue, track) => {
        if(process.env.DEBUG === '1')
            console.log('PlayerEvent: trackStart')
        Store.setPlaying(queue.guild.id, true)
        queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`)
    })
    player.on("trackEnd", (queue, track) => {
        if(process.env.DEBUG === '1')
            console.log('PlayerEvent: trackEnd')
        Store.setPlaying(queue.guild.id, false)
        queue.metadata.channel.send(`:stop_button:  | Finish playing **${track.title}**!`)
    })

    player.on("queueEnd", (queue) => {
        // Destroy queue
        if(process.env.DEBUG === '1')
            console.log('PlayerEvent: queueEnd')
        Store.setQueue(queue.guild.id, null)
        Store.setPlaying(queue.guild.id, false)
    })

    if(process.env.DEBUG === '1')
        player.on("debug", (queue, msg) => console.log(msg))
    
    player.on("error", (queue, error) => {
        if(process.env.DEBUG === '1')
            console.log('PlayerEvent: error')
        Store.setQueue(queue.guild.id, null)
        Store.setPlaying(queue.guild.id, false)
        queue.destroy()
        console.log('Something happen -> reset data of this server in store')
    })

    return player
}

module.exports = async (client, song, message) => {
    const player = createPlayer(client)

    if (!message.member.voice.channelId)
        return await message.reply("You are not in a voice channel!");
    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId)
        return await message.reply("You are not in my voice channel!");
    const query = song
    let queue = null
    if(Store.loadQueue(message.guildId) === null){
        // If old queue not found
        queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });
        Store.setQueue(message.guildId, queue)
        seteq(message.guildId, queue)
    }
    else{
        queue = Store.loadQueue(message.guildId)
    }
    
    // verify vc connection
    try {
        if (!queue.connection)
            await queue.connect(message.member.voice.channel);
    } catch {
        queue.destroy();
        Store.setQueue(message.guildId, null)
        Store.setPlaying(message.guild.id, false)
        return await message.reply("Could not join your voice channel!");
    }

    // await interaction.deferReply();
    const track = await player.search(query, {
        requestedBy: message.user
    }).then(x => x.tracks[0]);
    if (!track) return await message.reply(`❌ | Track **${query}** not found!`);

    if(Store.loadPlaying(message.guildId) === false){
        Store.setPlaying(message.guildId, true)
        queue.play(track);
        return await message.reply(`⏱️ | Loading track **${track.title}**!`);
    }
    else{
        queue.addTrack(track)
        return await message.reply(`:timer: | Add track **${track.title}**!`);
    }
}