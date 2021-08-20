require('dotenv').config();

// Register slash
const register_SLASH = require("./slash/register")

const { Client, Intents } = require('discord.js');
const { commands } = require('./slash/command');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName.charAt(0) === '-'){
    console.log('Type: ' + interaction.commandName)
    const response = await commands(interaction.commandName);
    await interaction.reply(response);
  }
});

client.login(process.env.TOKEN);


register_SLASH();