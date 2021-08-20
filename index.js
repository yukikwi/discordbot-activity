require('dotenv').config();
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { register_SLASH, exec_SLASH } = require("./slash/index")
const { exec_COMMAND } = require("./command/index")

// Register slash
register_SLASH();

client.on('interactionCreate', async interaction => {
  console.log('Interaction recived...');
  await exec_SLASH(interaction, client)
});

client.on('messageCreate', async message => {
	await exec_COMMAND
});

// =====================================

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
