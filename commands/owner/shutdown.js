const { MessageEmbed } = require('discord.js');
const Admins = require('../../models/admin')
module.exports = {
    name: 'shutdown',
    category: 'owner',
    description: 'Shuts down the bot',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
      await message.channel.send("Shutting down...")
      client.destroy()
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
