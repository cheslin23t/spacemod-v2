const { MessageEmbed } = require('discord.js');
const Admins = require('../../models/admin')
module.exports = {
    name: 'shutdown',
    category: 'owner',
    description: 'Shuts down the bot',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {

      console.log(message.content)
      console.log(message.author.id)
      console.log(message.author.tag)
      console.log("________SHUTDOWN________")
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
              message.lineReply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
