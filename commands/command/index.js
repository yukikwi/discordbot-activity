module.exports = (command) => {
    try{
        if(process.env.DEBUG === '1')
            console.log("Command: '"+command+"'")
        return require('./'+command)
    }
    catch (e) {
        if(process.env.DEBUG === '1')
            console.log(e)
        return false;
    }
}