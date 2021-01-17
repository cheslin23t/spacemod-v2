const Guild = require('../models/guild')

module.exports = async client => {
    console.log('Let\'s get this bread!');
    
    
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'By Spacehold',
            type: "PLAYING"
        }
    });
    client.api.applications(client.user.id).guilds('748534353214177321').commands.post({
        data: {
            name: "help",
            description: "Help command!"

            
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