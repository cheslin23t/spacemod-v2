const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "resume",
    category: "music",
    description: "To resume the paused music",
    usage: "resume",
    aliases: ["res"],

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("YELLOW")
      .setAuthor("Music has been Resumed!", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      return message.channel.send(xd);
    }
    
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("No song to resume.")
    await message.channel.send(embed)
    
  },
};