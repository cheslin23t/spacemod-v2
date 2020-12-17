const { MessageEmbed } = require('discord.js');
const Admins = require('../../models/admin')
module.exports = {
    name: 'maintenance',
    aliases: ['mait', 'setup'],
    category: 'owner',
    description: 'Sets the status of the bot (broken)',
    usage: `setstatus [Watching, Listening, Playing] [dnd, online, idle, invisible] [After before (Watching "You")] `,
    run: async (client, message, args) => {
      Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
      var yesno = args.join(" ").toLowerCase()
      if(yesno.includes("true") || yesno.includes("false")){
        if(yesno == "true"){
          client.user.setPresence({
        status: "dnd",
        activity: {
            name: "Under maintenance",
            type: "PLAYING"
        }
    })
        }
        else if(yesno = "false"){
          client.user.setPresence({
        status: "online",
        activity: {
            name: "Remade!",
            type: "PLAYING"
        }
    })
        }
        else{
          message.reply("please type the argument as true or false")
        }
      }
      
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
