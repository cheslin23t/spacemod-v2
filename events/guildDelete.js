const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if(err) console.error(err)
        console.log('I have been removed from a server!');
    });
  client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Serving ' + client.guilds.cache.size + " guilds.",
            type: "PLAYING"
        }
    });
};