const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    category: 'info',
    description: 'Shows voting links',
    usage: `vote`,
    run: async (client, message, args) => {
        var infoEmbed = new MessageEmbed()
        .setTitle("Vote for Spacechat Bot!", "https://status.spacemod.tk")
        .setAuthor("Spacechat Bot", "https://cdn.discordapp.com/avatars/753578252047745055/2b20a4dce26d364ac2b8e7941d8aa04c.png", "https://www.spacemod.tk")
        .setDescription("Please vote for us as it is very helpful! \n\n [Spacechat Bot | Discordbotlist.com](https://discordbotlist.com/bots/spacechat-bot/upvote)\nTop.gg coming soon!")
        message.channel.send(infoEmbed)


        
    }
}