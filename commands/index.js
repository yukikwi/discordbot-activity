const exec_COMMAND = (message) => {
    if (message.author.bot) return;

	let args;
	if (message.guild) {
		let prefix;

		if (message.content.startsWith(process.env.globalPrefix)) {
			prefix = process.env.globalPrefix;
		}

		if (!prefix) return;
		args = message.content.slice(prefix.length).trim().split(/\s+/);
	} else {
		const slice = message.content.startsWith(process.env.globalPrefix) ? process.env.globalPrefix.length : 0;
		args = message.content.slice(slice).split(/\s+/);
	}

	const command = args.shift().toLowerCase();

	if (command) {
        try{
            const { proc, required_args } = require(`./command/${command}`);
            if (args.length === required_args) {
                const msg = proc(args)
            } else {
                return message.channel.send(`Args not match`);
            }
        }
        catch (e) {
            // Command not found
            return message.channel.send(`Command not found`);
        }

	}
}

module.exports = {
    exec_COMMAND
}