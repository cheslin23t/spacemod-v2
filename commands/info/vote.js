const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'vote',
    category: 'info',
    description: 'Shows voting links',
    usage: `vote`,
    run: async (client, message, args) => {
        var infoEmbed = new MessageEmbed()
        .setTitle("Vote for Spacemod!", "https://status.spacemod.tk")
        .setAuthor("Spacemod", "https://cdn.discordapp.com/avatars/753578252047745055/2b20a4dce26d364ac2b8e7941d8aa04c.png", "https://www.spacemod.tk")
        .setDescription("Please vote for us as it is very helpful! \n\n [Spacemod | Discordbotlist.com](https://discordbotlist.com/bots/spacemod/upvote)\n[Spacechat | top.gg](https://top.gg/servers/748534353214177321/vote)")
        message.channel.send(infoEmbed)


        
    }
}