const mongoose = require('mongoose');
const Guild = require('../models/guild');

module.exports = async (client, guild) => {
    newguild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildID: guild.id,
        guildName: guild.name,
        prefix: process.env.PREFIX
    });
  
    newguild.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));
   client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Serving ' + client.guilds.cache.size + " guilds.",
            type: "PLAYING"
        }
    }); client.users.cache.get("964151420314091610").send("New server!" + guild.id + " " + guild.name)
    console.log('I have joined a new server!');
};