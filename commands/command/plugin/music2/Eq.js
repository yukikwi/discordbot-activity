const { Player, AudioFilters } = require("discord-player");
const Store = require('./Store')

AudioFilters.define("capybass", "firequalizer=gain_entry='entry(31,3);entry(62,1.5);entry(125,1);entry(500,-0.5);entry(1000,-0.5):delay=0.1:fixed=on:zero_phase=on'");

const eqList = [
    'capybass', 'bassboost_low', 'bassboost', 'bassboost_high', "8D", 'vaporwave', 'nightcore', 'phaser', 'tremolo', 'vibrato', 'reverse', 'treble', 'normalizer',
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