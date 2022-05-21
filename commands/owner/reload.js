const fs = require('fs')
const Admins = require('../../models/admin')
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'reload',
    category: 'owner',
    description: 'Reload Commands',
    usage: `Owner Only Command!`,
    run: async (client, message, args) => {
      Admins.findOne({
          userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
              const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

              
const commandFolders = fs.readdirSync('./commands');
const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));

              delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

try {
	const newCommand = require(`../${folderName}/${command.name}.js`);
	message.client.commands.set(newCommand.name, newCommand);
	message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
} catch (error) {
	console.error(error);
	message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
}
            }
            if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        }
      
}

        
