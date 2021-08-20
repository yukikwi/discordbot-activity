const commands = require("./command")
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const register_SLASH = async () => {
    try {
      console.log('Started refreshing application (/) commands.');
  
      await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
      );
  
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
}

const exec_SLASH = async (interaction, client) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
		await interaction.reply(`Pong! (${client.ws.ping} ms)`);
	}
}

module.exports = {
    register_SLASH,
    exec_SLASH
}