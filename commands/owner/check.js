const Admins = require('../../models/admin')
const { MessageEmbed } = require('discord.js');
const hastebin = require("hastebin-gen");
const mongoose = require("mongoose")
module.exports = {
    name: 'check',
    category: 'owner',
    description: 'cmd',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
              
 
var hasteurl;
hastebin(JSON.stringify(client.commands), { extension: "txt" }).then(haste => {
    // Logs the created hastebin url to the console
    message.channel.send(haste + " loaded cmds")
    
}).catch(error => {
    // Handle error
    console.error(error);
});

      
      
            }
            if(!guild){
              message.lineReply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
