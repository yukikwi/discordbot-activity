const { Player, AudioFilters } = require("discord-player");
const Store = require('./Store')

const seteq = (message, queue) => {
    // Config EQ
    if(Store.loadeq(message.guildId) !== ''){
        const eq = Store.loadeq(message.guildId)
        if(process.env.DEBUG === '1')
            console.log('Set eq to ' + eq)
        queue.setFilters(message, { eq: true });
    }
}

module.exports = async (client, song, message) => {
    const player = new Player(client);

    // Track event
    player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))
    player.on("trackEnd", (queue, track) => {
        queue.metadata.channel.send(`:stop_button:  | Finish playing **${track.title}**!`)
        seteq(message.guildId, queue)
    })
    if(process.env.DEBUG === '1')
        player.on("debug", (queue, msg) => console.log(msg))
    
    player.on("error", (queue, error) => console.log('Error: '+error))

    if (!message.member.voice.channelId)
        return await message.reply("You are not in a voice channel!");
    if (message.guild.me.voice.channelId && message.member.voice.channelId !== message.guild.me.voice.channelId)
        return await message.reply("You are not in my voice channel!");
        const query = song
        const queue = player.createQueue(message.guild, {
            metadata: {
                channel: message.channel
            }
        });

        Store.setQueue(message.guildId, queue)
        seteq(message.guildId, queue)
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            queue.destroy();
            return await message.reply("Could not join your voice channel!");
        }

        // await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: message.user
        }).then(x => x.tracks[0]);
        if (!track) return await message.reply(`❌ | Track **${query}** not found!`);

        queue.play(track);

        return await message.reply(`⏱️ | Loading track **${track.title}**!`);
}