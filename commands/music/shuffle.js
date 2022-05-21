const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "shuffle",
  category: "music",
    description: "Shuffle queue",
    usage: "shuffle",
    aliases: ["shuffle"],

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription('No songs to shuffel.')
    await message.channel.send(embed)
    
    return}
try{
    let songs = serverQueue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    serverQueue.songs = songs;
    message.client.queue.set(message.guild.id, serverQueue);
    message.react("✅")
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Unexpected error: ${error}`)
    await message.channel.send(embed)
    
    return
     }
  },
};