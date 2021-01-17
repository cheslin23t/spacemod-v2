const Suggestions = require('../../models/suggestion')
const Admins = require('../../models/admin')
const hastebin = require("hastebin-gen");
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'read',
    category: 'owner',
    description: 'cmd',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
            var readdoc = []
                var docs = await Suggestions.find({ });
                for (let i = 0; i < docs.length; ++i) {
  const item = docs[i];

  readdoc.push(item)
}

                hastebin(readdoc, { extension: "txt" }).then(haste => {
    // Logs the created hastebin url to the console
    message.author.send(haste + " Suggestions")
    message.channel.send("Check your dms!")
    
}).catch(error => {
    // Handle error
    console.error(error);
});
      
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
