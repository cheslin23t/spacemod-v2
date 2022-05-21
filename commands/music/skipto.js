const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "skipto",
  category: "music",
    description: "Skip to the selected queue number",
    usage: "skipto <number>",
    aliases: ["st"],

  run: async function (client, message, args) {
    if (!args.length || isNaN(args[0]))
      return message.channel.send({
                        embed: {
                            color: "GREEN",
                            description: `**Usage**: \`skipto <number>\``
                        }
   
                   }).catch(console.error);
        

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Nothing is playing right now.`)
    await message.channel.send(embed)
    
    return}
    if (args[0] > queue.songs.length)
      {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`The queue is only ${queue.songs.length} songs long!`)
    await message.channel.send(embed)
    
    return}

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Unexpected error: ${error}`)
    await message.channel.send(embed)
    
    return
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "GREEN",
                            description: `${message.author} ⏭ skipped \`${args[0] - 1}\` songs`
                        }
   
                   }).catch(console.error);
                   message.react("✅")

  },
};