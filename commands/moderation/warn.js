const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../models/user');
const Guild = require('../../models/guild');

module.exports = {
    name: 'warn [broken]',
    category: 'owner',
    description: 'warns the mentioned user in your server. After 3 warns will result into a kick',
    usage: `warn <@user> [reason]`,
    run: async (client, message, args) => {
      return message.reply("Command disabled... Reason: Broken")
        message.delete();

        const member = message.mentions.members.first();

        const guildDB = await Guild.findOne({
            guildID: message.guild.id
        }, async (err, guild) => {
            if (err) console.error(err);
            
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    logChannelID: null
                });

                await newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        const logChannel = message.guild.channels.cache.get(guildDB.logChannelID);

        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send('You do not have permission to use this command.').then(m => m.delete({timeout: 5000}));

        if (!member)
            return message.channel.send('I cannot find the specified member. Please mention a member in this Discord server.').then(m => m.delete({timeout: 5000}));

        if (!member.kickable)
            return message.channel.send('This member is not kickable.').then(m => m.delete({timeout: 5000}));

        if (message.member.roles.highest.position < member.roles.highest.position)
            return message.channel.send('You cannot kick someone with a higher role than you.').then(m => m.delete({timeout: 5000}));

        User.findOne({
            guildID: message.guild.id,
            userID: member.id
        }, async (err, user) => {
            if (err) console.error(err);
            if(user.warnCount >= 3) {
            member.kick(reason)
            var kickembed = new MessageEmbed()
              .setTitle("User kicked!")
              .addField("Reason", "Too many warns")
              .addField("Lastest Warn Reason", reason)
              .addField("Total Kicks", user.kickCount)
            
            logChannel.send(kickembed)
            
            }
            if (!user) {
                const newUser = new User({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: member.id,
                    muteCount: 0,
                    warnCount: 1,
                    kickCount: 0,
                    banCount: 0
                });

                await newUser.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
            } else {
                user.updateOne({
                    warnCount: user.warnCount + 1
                })
                .then(result => console.log(result))
                .catch(err => console.error(err));
            };
        });

        let reason = 'No reason specified';

        if (args.length > 1) reason = args.slice(1).join(' ');

        member.author.send("You have been warned for " + reason)
        message.channel.send(`${member} was **warned**!`);
        if (!logChannel) {
            return
        } else {
            const embed = new MessageEmbed()
                .setColor(15158332)
                .setTitle('User warned')
                .setThumbnail(member.user.avatarURL())
                .addField('Username', member.user.username)
                .addField('User ID', member.id)
                .addField('Warned by', message.author)
                .addField('Reason', reason)
                .addField("Total Warns", user.warnCount)
                .addField("Warns left until kick", user.warnCount - 3)

            return logChannel.send(embed);
        };
    }
};