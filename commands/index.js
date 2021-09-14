const autoload = require('./command/index.js');

const exec_COMMAND = (client, message) => {
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
            const commandMain = autoload(command)
            if(commandMain === false)
                return message.channel.send(`Command not found`);
            const { proc, required_args } = commandMain

            // Subcommand depend on first args
            const required_arg = typeof(required_args[args[0]])  === 'undefined' ? required_args.default : required_args[args[0]]
            if (args.length >= required_arg) {
                while(args.length > required_arg){
                    args[args.length - 2] = args[args.length - 2] + ' ' + args[args.length - 1]
                    args.pop()
                }
                const msg = proc(client, message, args)
            } else {
                return message.channel.send(`Args not match`);
            }
        }
        catch (e) {
            if(process.env.DEBUG == 1){
                console.log(e)
            }
            return message.channel.send(`Internal error`);
        }

	}
}

module.exports = {
    exec_COMMAND
}