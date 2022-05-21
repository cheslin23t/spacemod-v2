
const Admins = require('../../models/admin')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'say',
    category: 'owner',
    description: 'Says something',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      Admins.findOne({
          userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
              if(message.guild.me.hasPermission("MANAGE_MESSAGE")){
      message.delete()
              }
        
        if (args.length < 1)
            return message.channel.send('You must specify something for the bot to repeat!').then(m => m.delete({timeout: 5000}));

        if (args[0].toLowerCase() === 'embed') {
            const embed = new MessageEmbed()
                .setColor(process.env.COLOR)
                .setDescription(args.slice(1).join(' '))

            message.channel.send(embed);
        } else {
            message.channel.send(args.join(' '));
        }
      
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
