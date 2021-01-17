const { Client, Collection } = require('discord.js');
const { config } = require('dotenv');
const fs = require('fs');
const ascii = require('ascii-table');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const admins = require('./models/admin')
const client = new Client();
const express = require('express')
const app = express()
var adminlist
var usrnames = []
async function getAdmins() {
var store = require("./models/admin.js")
  var docs = await store.find({ });
  var usrnames = []
  
  
  
  for (let index = 0; index < docs.length; index++) {
    var usrelement = docs[index].name;
    var levelelement = docs[index].level;
    
    
    usrnames.push("<center> Username: " + usrelement + ", Level: " + levelelement)
    
  }
  var returnlist = await usrnames
  adminlist = returnlist.join("</center> <br> ")
  
  
}
getAdmins()



  
client.commands = new Collection();
client.aliases = new Collection();
const table = new ascii().setHeading('Command', 'Status');
client.mongoose = require('./utils/mongoose');
readdirSync('./commands/').forEach(async dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow('<br>' + file, '✅ Loaded! <br>');
            } else {
                table.addRow('<br>' + file, '❌ -> Command failed to load, please check your work again! <br>');
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => {
                    return client.aliases.set(alias, pull.name);
                });
        }
        

app.get("/", (req, res) => {

  var loads

res.send(table.toString())

    })
})


app.listen(1234)

client.categories = fs.readdirSync('./commands/');

config({
    path: `${__dirname}/.env`
});

['command'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

fs.readdir('./events/', (err, files) => {
    if (err) return console.error;
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        
        client.on(evtName, evt.bind(null, client));
    })
});



client.mongoose.init();
client.login(process.env.TOKEN)