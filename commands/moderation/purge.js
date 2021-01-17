const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    category: 'moderation',
    description: '',
    usage: ``,
    run: async (client, message, args) => {

const amount = args.join(" ")
if(!message.member.hasPermission("MANAGE_MESSAGES") && message.member.id ==! '538449553142317077' && message.member.id ==! '595345498379124756')
return;
await message.delete()
if (!amount || amount > 100)
 return message.channel.send("Please provide a message between 1 and 100");

message.channel.bulkDelete(amount, true).then(messages=> {
const embed = new MessageEmbed()
.setTitle("Purge")
.setDescription(`Successfully deleted **${messages.size}** message(s)`)
.setColor(process.env.COLOR)
.setTimestamp();

message.channel.send(embed);
})
}
}