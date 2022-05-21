const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'info',
    aliases: ['botinfo', 'bot'],
    category: 'info',
    description: 'Shows bot info',
    usage: `info`,
    run: async (client, message, args) => {
        var infoEmbed = new MessageEmbed()
        .setTitle("Bot info", "https://status.spacemod.tk")
        .setAuthor("Spacechat Bot", "https://cdn.discordapp.com/avatars/753578252047745055/2b20a4dce26d364ac2b8e7941d8aa04c.png", "https://www.spacemod.tk")
        .setDescription("Spacechat Bot is a growing discord bot!")
        .addField("What framework does Spacechat Bot use", "**Discord.js**")
        .addField("Who owns this bot", "Spacehold as the primary owner.")
        .setColor("#050b4d")
        message.channel.send(infoEmbed)


        
    }
}