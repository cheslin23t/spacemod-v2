const { Util, MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
  category: "music",
    description: "To skip the current music playing",
    usage: "skip",
    aliases: ["s"],

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
    .setDescription(`No songs to skip.`)
    await message.channel.send(embed)
    
    return}
        if(!serverQueue.connection)return
if(!serverQueue.connection.dispatcher)return
     if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription("▶ Resumed the music for you!")
      .setColor("YELLOW")
      .setTitle("Music has been Resumed!")
       
   return message.channel.send(xd).catch(err => console.log(err));
      
    }


       try{
      serverQueue.connection.dispatcher.end()
      } catch (error) {
        serverQueue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
        {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`No songs left in queue. Stopping music.`)
    await message.channel.send(embed)
    
    return}
      }
    message.react("✅")
  },
};