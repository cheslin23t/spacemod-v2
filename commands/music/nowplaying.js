const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "nowplaying",
  category: "music",
    description: "To show the music which is currently playing in this server",
    usage: "nowplaying",
    aliases: ["np", "playing"],
  

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("There is nothing playing.")
    await message.channel.send(embed)
    
    return}
    let song = serverQueue.songs[0]
    let thing = new MessageEmbed()
      .setAuthor("Now Playing", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
    return message.channel.send(thing)
  },
}