const { MessageEmbed } = require("discord.js");

module.exports = {
  
    name: "loop",
  category: "music",
    description: "Toggle music loop",
    usage: "loop",
  

  run: async function (client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `🔁  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        }
    let embed = new MessageEmbed()
    .setColor("YELLOW")
    .setDescription("There's nothing to play in this server.")
    await message.channel.send(embed)
  },
};