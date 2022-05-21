const discord = require("discord.js");

module.exports = {
        name: "leave",
        category: "music",
        description: "Leaves the voice channel of the messenger",
        usage: "[leave]",
        
    

    run: async function (client, message, args) {
        let embed = new discord.MessageEmbed()
        .setDescription("Goodbye!")
        .setColor("YELLOW")
        .setFooter(`Requested by ${message.author.username}`)
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("You need to be in a voice channel");

        await voiceChannel.leave();
        await message.channel.send(embed);
    }
}