const { MessageEmbed } = require('discord.js');
const Admins = require('../../models/admin')
const discord = require("discord.js");
const message = require('../../events/message');
const mongoose = require('mongoose')




module.exports = {
    name: 'grant',
    category: 'owner',
    description: 'Grants a user on SPACEMOD roles | Level 1 = VIP | Level 2 = PREMIUM | Level 3 = MODERATOR | Level 4 = ADMIN | Level 5 = OWNER',
    usage: `grant <user> <level>`,
    run: async (client, message, args) => {
        var member = message.mentions.members.first();
const adminDB = await Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if(!guild){
              message.lineReply("you do not have the permission to use this command")
            } else{

              var member = message.mentions.members.first();
              var level = 0
              if (args.length > 1) level = args.slice(1).join(' ');
              Admins.findOne({
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);

            if (!user) {
              if(level <= 0){
                return message.channel.send("User already level 0!")
              }
                const newAdmin = new Admins({
                    _id: mongoose.Types.ObjectId(),
                    name: member.user.tag,
                    userID: member.user.id,
                    level: level
                });

                await newAdmin.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
                message.channel.send("Created " + member.user.tag + " as an level " + level + " user!")
            } else {
              if(level <= 0){
                user.deleteOne()
                return message.channel.send("Removed " + member.user.tag + " from our admins.")
              }
                user.updateOne({
                    level: level
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
                message.channel.send("Promoted " + member.user.tag + " to level " + level)
            };
        });

            }
            });
        }

        
    }
