const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "pause",
  category: "music",
    description: "To pause the current music in the server",
    usage: "pause",
    aliases: ["pause"],
  

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
	    try{
      serverQueue.connection.dispatcher.pause()
	  } catch (error) {
        message.client.queue.delete(message.guild.id);
        
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`:notes: The player has stopped and the queue has been cleared.: ${error}`)
    await message.channel.send(embed)
    
    return
      }	    
      let xd = new MessageEmbed()
      .setDescription("⏸ Paused the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been paused!")
      return message.channel.send(xd);
    }
    let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`There is nothing playing in this server.`)
    await message.channel.send(embed)
    return
  },
};