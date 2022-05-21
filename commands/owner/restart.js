const { MessageEmbed } = require('discord.js');
const Admins = require('../../models/admin')
const { config } = require('dotenv');
module.exports = {
    name: 'restart',
    category: 'owner',
    description: 'Restarts the bot',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
      await message.channel.send("Restarting...")
      await client.user.setPresence({
        status: "invisible",
      })
      client.destroy()
      setTimeout(async function(){ await client.login(process.env.TOKEN)
      client.user.setPresence({
        status: "online",
      })
      message.channel.send("Restart complete!")
      }, 3000);
            }
            if(!guild){
              message.lineReply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
