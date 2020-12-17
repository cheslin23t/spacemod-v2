const { MessageEmbed } = require('discord.js');
const Admins = require('../../models/admin')
module.exports = {
    name: 'shutdown',
    category: 'owner',
    description: 'Shuts down the bot',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      if(message.author.id == "595345498379124756"){
        message.channel.send("Shutting down...")
      client.destroy()
}
else{
  message.reply("you do not have the permission to use this command.")
}
        
    }
}