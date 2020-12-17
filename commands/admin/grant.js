const { MessageEmbed } = require('discord.js');

const discord = require("discord.js");
//const message = require('../../events/message');





module.exports = {
    name: 'command',
    category: 'cmdcatagory',
    description: 'cmddesc',
    usage: `ping`,
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command!').then(m => m.delete({timeout: 10000}));
        };


        
    }
}