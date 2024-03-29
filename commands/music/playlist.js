const {
	Util,
	MessageEmbed
} = require("discord.js");
const ytdl = require("ytdl-core");
const yts = require("yt-search");
const ytdlDiscord = require("ytdl-core-discord");
var ytpl = require('ytpl');
const fs = require('fs');

module.exports = {
		name: "playlist",
  category: "music",
		description: "To play songs :D",
		usage: "<YouTube Playlist URL | Playlist Name>",
		aliases: ["pl"],

	run: async function (client, message, args) {
		const channel = message.member.voice.channel;
		if (!channel) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Please join a VC.")
    await message.channel.send(embed)
    
    return}
		const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
		var searchString = args.join(" ");
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has("CONNECT")){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Oops, I can't connect to your voice channel. Please make sure I have permissions!")
    await message.channel.send(embed)
    
    return}
		if (!permissions.has("SPEAK")){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Oops, I can't speak in your voice channel. Please make sure I have permissions!")
    await message.channel.send(embed)
    
    return}

		if (!searchString||!url) {
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Incorrect usage. Please use the help command.")
    await message.channel.send(embed)
    
    return}
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			try {
				const playlist = await ytpl(url.split("list=")[1]);
				if (!playlist){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Can't find the playlist on Youtube.")
    await message.channel.send(embed)
    
    return}
				const videos = await playlist.items;
				for (const video of videos) {
					// eslint-disable-line no-await-in-loop
					await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
				}
				return message.channel.send({
					embed: {
						color: "GREEN",
						description: `✅  **|**  Playlist: **\`${videos[0].title}\`** has been added to the queue`
					}
				})
			} catch (error) {
				console.error(error);
				
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Cannot find the playlist on Youtube.")
    await message.channel.send(embed)
    
    return
			}
		} else {
			try {
				var searched = await yts.search(searchString)

				if (searched.playlists.length === 0){
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Cannot find the playlist on Youtube.")
    await message.channel.send(embed)
    
    return}
				var songInfo = searched.playlists[0];
				let listurl = songInfo.listId;
				const playlist = await ytpl(listurl)
				const videos = await playlist.items;
				for (const video of videos) {
					// eslint-disable-line no-await-in-loop
					await handleVideo(video, message, channel, true); // eslint-disable-line no-await-in-loop
				}
				let thing = new MessageEmbed()
					.setAuthor("Playlist has been added to queue", "https://media.discordapp.net/attachments/821270469172658196/845709703358971904/Music.gif")
					.setThumbnail(songInfo.thumbnail)
					.setColor("GREEN")
					.setDescription(`✅  **|**  Playlist: **\`${songInfo.title}\`** has been added \`${songInfo.videoCount}\` video to the queue`)
				return message.channel.send(thing)
			} catch (error) {
				
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Unexpected error")
    await message.channel.send(embed)
    
    return
			}
		}

		async function handleVideo(video, message, channel, playlist = false) {
			const serverQueue = message.client.queue.get(message.guild.id);
			const song = {
				id: video.id,
				title: Util.escapeMarkdown(video.title),
				views: video.views ? video.views : "-",
				ago: video.ago ? video.ago : "-",
                                duration: video.duration,
				url: `https://www.youtube.com/watch?v=${video.id}`,
				img: video.thumbnail,
				req: message.author
			};
			if (!serverQueue) {
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

				try {
					var connection = await channel.join();
          connection.voice.setSelfDeaf(true);
					queueConstruct.connection = connection;
					play(message.guild, queueConstruct.songs[0]);
				} catch (error) {
					console.error(`I could not join the voice channel: ${error}`);
					message.client.queue.delete(message.guild.id);
					
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("Oops, I can't connect to your voice channel. Please make sure I have permissions!")
    await message.channel.send(embed)
    
    return

				}
			} else {
				serverQueue.songs.push(song);
				if (playlist) return;
				let thing = new MessageEmbed()
					.setAuthor("Song has been added to queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
					.setThumbnail(song.img)
					.setColor("YELLOW")
					.addField("Name", song.title, true)
					.addField("Duration", song.duration, true)
					.addField("Requested by", song.req.tag, true)
					.setFooter(`Views: ${song.views} | ${song.ago}`)
				return message.channel.send(thing);
			}
			return;
		}

async	function play(guild, song) {
			const serverQueue = message.client.queue.get(message.guild.id);
  let afk = JSON.parse(fs.readFileSync("./afk.json", "utf8"));
       if (!afk[message.guild.id]) afk[message.guild.id] = {
        afk: false,
    };
    var online = afk[message.guild.id]
    if (!song){
      if (!online.afk) {
        
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("No songs in queue. Leaving VC.")
    await message.channel.send(embed)
    
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
        if (serverQueue) {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
          
                 let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription(`An unexpected error has occurred.\nPossible type \`${er}\``)
    await message.channel.send(embed)
    
    return

         }
       }
     });
}
 
      serverQueue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));
			const dispatcher = serverQueue.connection
         .play(ytdl(song.url,{quality: 'highestaudio', highWaterMark: 1 << 25 ,type: "opus"}))
        .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })

    dispatcher.setVolume(serverQueue.volume / 100);
let thing = new MessageEmbed()
				.setAuthor("Started Playing Music!", "https://raw.githubusercontent.com/Akshit1025/discordjs-music-bot/main/assets/Music.gif")
				.setThumbnail(song.img)
				.setColor("BLUE")
				.addField("Name", song.title, true)
				.addField("Duration", song.duration, true)
				.addField("Requested by", song.req.tag, true)
				.setFooter(`Views: ${song.views} | ${song.ago}`)
    serverQueue.textChannel.send(thing);
}


	},



}