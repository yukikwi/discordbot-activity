const required_args = {
  default: 1
}

const proc = (client, message, args) => {
  const { help } = require('./'+args[0])
  return help(message)
}

const help = (message) => {
  return message.channel.send("Help is help")
}

module.exports = {
  required_args,
  proc,
  help
}