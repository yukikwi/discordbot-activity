const { Player, AudioFilters } = require("discord-player");
const Store = require('./Store')

AudioFilters.define("capybass_low", "firequalizer=gain_entry='entry(31,3);entry(62,1.5);entry(125,1);entry(500,-0.5);entry(1000,-0.5)'");
AudioFilters.define("capybass", "firequalizer=gain_entry=\'entry(31,10);entry(62,5.8);entry(125,3);entry(500,-1.5);entry(1000,-1.5)'");

const eqList = [
    'capybass', 'capybass_low',
    'bassboost_low', 'bassboost', 'bassboost_high', "8D", 'vaporwave', 'nightcore', 'phaser', 'tremolo', 'vibrato', 'reverse', 'treble', 'normalizer',
    'normalizer2', 'surrounding', 'pulsator', 'subboost', 'karaoke', 'flanger', 'gate', 'haas', 'mcompand', 'mono', 'mstlr', 'mstrr', 'compressor',
    'expander', 'softlimiter', 'chorus', 'chorus2d', 'chorus3d', 'fadein', 'dim', 'earrape', 'off'
]

module.exports = async (client, eq, message) => {
    if(eqList.includes(eq)){
        if(eq === 'off'){
            Store.seteq(message.guildId, '')
            message.reply(':musical_score: Eq is disable now')
        }
        else {
            Store.seteq(message.guildId, eq)
            message.reply(':musical_score: Eq is set now')
        }
    }
    else
        message.reply(':interrobang: EQ not found')
}