const { MessageEmbed, Guild } = require('discord.js');
const { stripIndents } = require('common-tags');
const mongoose = require('mongoose')
const Guildschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  logChannelID: String
})

const Guildmod = mongoose.model('guild2', Guildschema, 'guilds');
module.exports = {
  name: 'commands',
  aliases: ['cmds'],
  category: 'info',
  description: 'Displays a full list of bot commands.',
  usage: `commands`,
  run: async (client, message, args) => {
    await Guildmod.findOne({
      guildID: message.guild.id
    }, (err, guild) => {
      if (err) console.error(err)
      if (!guild) {
        const newGuild = new Guildmod({
          _id: mongoose.Types.ObjectId(),
          guildID: message.guild.id,
          guildName: message.guild.name,
          prefix: process.env.PREFIX,
          logChannelID: null
        });

        newGuild.save()
          .then(result => console.log(result))
          .catch(err => console.error(err));
      }
    });

    return getAll(client, message);



    async function getAll(client, message) {
      const guildDB = await Guildmod.findOne({
        guildID: message.guild.id
      });
      const commands = (category) => {
        return client.commands
          .filter(cmd => cmd.category === category)
          .map(cmd => `- \`${(guildDB.prefix) + cmd.name}\``)
          .join('\n');
      }
      if (args[0]) {
        const cateembed = new MessageEmbed()
          .setColor(process.env.COLOR)
          .setTitle('Commands found')
          .setThumbnail(client.user.avatarURL())
          .setFooter('Created by spacehold')
          .addField("Spacehold's Server", "[Invite](https://discord.gg/2psC9ph)")
          .addField("Spacemod Support Server", "[Invite](https://discord.gg/2KswAhHB)")

        message.channel.send(cateembed.setDescription('Use `' + `${guildDB.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n **Commands found for this category:**\n\n` + commands(args[0]))
        )
      }
      else {
        

        const embed = new MessageEmbed()
          .setColor(process.env.COLOR)
          .setTitle('Command List')
          .setThumbnail(client.user.avatarURL())
          .setFooter('Created by spacehold')
          .addField("Spacehold's Server", "[Invite](https://discord.gg/2psC9ph)")
          .addField("Spacemod Support Server", "[Invite](https://discord.gg/2KswAhHB)")



        const info = client.categories
          .map(cat => stripIndents`**${cat[0].toLowerCase() + cat.slice(1)}** \n`)
          .reduce((string, category) => `${string}\n${category}`);


        return message.channel.send(embed.setDescription('Use `' + (`${guildDB.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\nTo search an category, just type ${guildDB.prefix}cmds <category>\n\n${info}`)));


      }
    }
}
}