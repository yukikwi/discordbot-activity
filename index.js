require('dotenv').config();
// Initial discordjs
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { generateDependencyReport } = require('@discordjs/voice');
const { register_SLASH, exec_SLASH } = require("./slash/index")
const { exec_COMMAND } = require("./commands/index.js")

// Register slash
register_SLASH();

client.on('interactionCreate', async interaction => {
  await exec_SLASH(interaction, client)
});

client.on('messageCreate', async message => {
	await exec_COMMAND(client, message)
});

// =====================================

client.on('ready', () => {
  if(process.env.DEBUG === '1')
    console.log(generateDependencyReport());
  
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
