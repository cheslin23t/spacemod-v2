const Admins = require('../../models/admin')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'loadedCommands',
    category: 'owner',
    description: 'Shows Loaded Commands!',
    usage: `Owner Only Command!`,
  aliases: ['loaded', 'loadedcmds'],
    run: async (client, message, args) => {
      Admins.findOne({
          userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
      message.lineReply(client.loadedCommands.toString())
      
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
