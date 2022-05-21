const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "stop",
  category: "music",
    description: "To stop the music and clearing the queue",
    usage: "",
    aliases: [],

  run: async function (client, message, args) {
    const channel = message.member.voice.channel
    if (!channel){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Please join a VC.`)
    await message.channel.send(embed)
    
    return}
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Nothing is currently playing.`)
    await message.channel.send(embed)
    
    return}
   if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     try{
      serverQueue.connection.dispatcher.end();
      } catch (error) {
        message.guild.me.voice.channel.leave();
        message.client.queue.delete(message.guild.id);
        
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Unexpected Error: ${error}`)
    await message.channel.send(embed)
    
    return
      }
    message.client.queue.delete(message.guild.id);
    serverQueue.songs = [];
    message.react("✅")
  },
};