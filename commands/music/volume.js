const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
  category: "music",
    description: "To change the server song queue volume",
    usage: "volume",
    aliases: ["v", "vol"],

  run: async function (client, message, args) {
    const channel = message.member.voice.channel;
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
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`Volume can only be 0-150`)
    await message.channel.send(embed)
    
    return}
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: **${args[0]/1}/100**`)
    .setAuthor("Server Volume Manager", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};