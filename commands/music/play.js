const { Util, MessageEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const yts = require("yt-search");
const fs = require('fs');

module.exports = {
  
    name: "play",
  category: "music",
    description: "To play songs :D",
    usage: "play <YouTube_URL> | <song_name>",
    aliases: ["p", "search"],
  

  run: async function (client, message, args) {
    var loadMsg;
    message.lineReply("Loading Song...").then(msg => {
      loadMsg = msg
    })
    let channel = message.member.voice.channel;
    if (!channel){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Please join a voice channel.")
    await loadMsg.edit(embed)
    
    return}

    const permissions = channel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT")){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Oops, I can't connect to your voice channel. Please make sure I have permissions!")
    await loadMsg.edit(embed)
    
    return}
    if (!permissions.has("SPEAK")){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("I cannot speak in your voice channel. Please make sure I have permissions!")
    await loadMsg.edit(embed)
    
    return}

    var searchString = args.join(" ");
    if (!searchString){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Please add a song name I should play. Use the help cmd for more info.")
    await loadMsg.edit(embed)
    
    return}
   	const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
   var serverQueue = message.client.queue.get(message.guild.id);

     let songInfo = null;
    let song = null;
    if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
       try {
          songInfo = await ytdl.getInfo(url)
          if(!songInfo){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Couldn't find the song on Youtube.")
    await loadMsg.edit(embed)
    
    return}
        song = {
       id: songInfo.videoDetails.videoId,
       title: songInfo.videoDetails.title,
       url: songInfo.videoDetails.video_url,
       img: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
      duration: songInfo.videoDetails.lengthSeconds,
      ago: songInfo.videoDetails.publishDate,
      views: String(songInfo.videoDetails.viewCount).padStart(10, ' '),
      req: message.author

        };

      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }else {
      try {
        var searched = await yts.search(searchString);
    if(searched.videos.length === 0){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("The song doesn't exist on Youtube.")
    await loadMsg.edit(embed)
    
    return}
    
     songInfo = searched.videos[0]
        song = {
      id: songInfo.videoId,
      title: Util.escapeMarkdown(songInfo.title),
      views: String(songInfo.views).padStart(10, ' '),
      url: songInfo.url,
      ago: songInfo.ago,
      duration: songInfo.duration.toString(),
      img: songInfo.image,
      req: message.author
        };
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (serverQueue) {
      serverQueue.songs.push(song);
      let thing = new MessageEmbed()
      .setAuthor("Song has been added to queue", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
      .setThumbnail(song.img)
      .setColor("YELLOW")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      return loadMsg.edit(thing);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: channel,
      connection: null,
      songs: [],
      volume: 80,
      playing: true,
      loop: false
    };
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song) => {
      const queue = message.client.queue.get(message.guild.id);
    let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        
                 let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription("No songs in queue. Leaving the VC.")
    await loadMsg.edit(embed)
    
    
        message.guild.me.voice.channel.leave();//If you want your bot stay in vc 24/7 remove this line :D
        message.client.queue.delete(message.guild.id);
      }
            return message.client.queue.delete(message.guild.id);
}
 let stream = null; 
    if (song.url.includes("youtube.com")) {
      
      stream = await ytdl(song.url);
stream.on('error', async function(er)  {
      if (er) {
        if (queue) {
        queue.songs.shift();
        play(queue.songs[0]);
          
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`An unexpected error has occurred.\nPossible type \`${er}\``)
    await loadMsg.edit(embed)
    
    return
  	  
          }
        }
    });
}
    queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

      const dispatcher = queue.connection
         .play(ytdl(song.url, {quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
         .on("finish", () => {
           const shiffed = queue.songs.shift();
            if (queue.loop === true) {
                queue.songs.push(shiffed);
            };
          play(queue.songs[0])
        })

      dispatcher.setVolumeLogarithmic(queue.volume / 100);
      let thing = new MessageEmbed()
      .setAuthor("Started Playing Music!", "https://raw.githubusercontent.com/Akshit1025/discordjs-music-bot/main/assets/Music.gif")
      .setThumbnail(song.img)
      .setColor("BLUE")
      .addField("Name", song.title, true)
      .addField("Duration", song.duration, true)
      .addField("Requested by", song.req.tag, true)
      .setFooter(`Views: ${song.views} | ${song.ago}`)
      queue.textChannel.send(thing);
    };

    try {
      const connection = await channel.join();
      connection.voice.setSelfDeaf(true);
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      message.client.queue.delete(message.guild.id);
      await channel.leave();
      
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Oops, I can't connect to your voice channel. Please make sure I have permissions!")
    await loadMsg.edit(embed)
    
    return
    }
  


},

};