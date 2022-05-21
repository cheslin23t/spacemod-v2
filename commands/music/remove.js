const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "remove",
  category: "music",
    description: "Remove song from the queue",
    usage: "rm <number>",
    aliases: ["rm"],

  run: async function (client, message, args) {
   const queue = message.client.queue.get(message.guild.id);
    if (!queue) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("No songs to remove from queue!")
    await message.channel.send(embed)
    
    return}
    if (!args.length) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Usage: ${client.config.prefix}\`remove <Queue Number>\``)
    await message.channel.send(embed)
    
    return}
    if (isNaN(args[0])) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Usage: ${client.config.prefix}\`remove <Queue Number>\``)
    await message.channel.send(embed)
    
    return}
    if (queue.songs.length == 1) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("No songs to remove from queue!")
    await message.channel.send(embed)
    
    return}
    if (args[0] > queue.songs.length){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`The queue is only ${queue.songs.length} songs long!`)
    await message.channel.send(embed)
    
    return}
try{
    const song = queue.songs.splice(args[0] - 1, 1); 
    
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`❌ **|** Removed: **\`${song[0].title}\`** from the queue.`)
    await message.channel.send(embed)
    
  
                   message.react("✅")
} catch (error) {
        
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`:notes: An unexpected error occurred.\nPossible type: ${error}`)
    await message.channel.send(embed)
    
    return
      }
  },
};