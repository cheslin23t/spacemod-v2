const Guild = require('../models/guild')
const colors = require('colors')
console.log('test')
module.exports = async client => {
    console.log('Running on '.brightCyan + client.user.tag.brightYellow + ' app!'.brightCyan);
    console.log('------------------------------------------------'.brightRed)
    
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'Serving ' + client.guilds.cache.size + " guilds.",
            type: "PLAYING"
        }
    });
    
    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if(command == 'help') {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: `Please type **.help** or use your prefix.`
                    }
                }
            });
        }
    })
}