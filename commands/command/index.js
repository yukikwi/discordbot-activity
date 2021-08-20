module.exports = (command) => {
    try{
        return require('./'+command)
    }
    catch (e) {
        return false;
    }
}