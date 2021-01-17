const { MessageEmbed } = require('discord.js');
const Suggest = require('../../models/suggestion');
const mongoose = require("mongoose")
module.exports = {
    name: 'suggest',
    category: 'info',
    description: 'Sends a suggestion to our developers!',
    usage: `suggest <message>`,
    run: async (client, message, args) => {
        
      if(args[0]){
        const newSuggest = new Suggest({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    userID: message.author.id,
                    message: args.join(" ")
                })

                newSuggest.save()
                .then(result =>{
                  console.log(result)
                  message.channel.send("Suggestion sent!")
                })
                .catch(err => console.error(err));
      }
      else{
        message.channel.send("Please suggest with an message!")
      }

        
    }
}