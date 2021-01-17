const Admins = require('../../models/admin')
const { MessageEmbed } = require('discord.js');
const Updates = require("../../models/update")
const mongoose = require("mongoose")
module.exports = {
    name: 'update',
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
              message.delete().catch(err =>{
                message.channel.send(err)
              })

              const newUpdate = new Updates({
                    _id: mongoose.Types.ObjectId(),
                    sent: message.author.tag,
                    Version: args[0],
                    Description: args.join(" ").toString().replace(args[0] + " ", '')
                })

                newUpdate.save()
                .catch(err => console.error(err));

      
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
