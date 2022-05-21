const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  
    name: "lyrics",
  category: "music",
    description: "Get lyrics for the currently playing song",
    usage: "lyrics [lyrics]",
    aliases: ["ly"],

  run: async function (client, message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("There is nothing playing.")
    await message.channel.send(embed)
    
    return}

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.songs[0].title} — Lyrics`, "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(queue.songs[0].img)
      .setColor("YELLOW")
      .setDescription(lyrics)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};