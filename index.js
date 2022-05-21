require('discord-reply'); //⚠️ IMPORTANT: put this before your discord.Client()
var discord = require('discord.js')
var Collection = discord.Collection
const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded());
// Optional events

const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });
const { config } = require('dotenv');
const fs = require('fs');
const ascii = require('ascii-table');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const admins = require('./models/admin')

var adminlist
var usrnames = []
async function getAdmins() {
var store = require("./models/admin.js")
  var docs = await store.find({ });
  var usrnames = []
  
  app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
  
  for (let index = 0; index < docs.length; index++) {
    var usrelement = docs[index].name;
    var levelelement = docs[index].level;
    
    
    usrnames.push("<center> Username: " + usrelement + ", Level: " + levelelement)
    
  }
  var returnlist = await usrnames
  adminlist = returnlist.join("</center>  ")
  
  
}
getAdmins()



  
client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();
const table = new ascii().setHeading('Command', 'Status');
client.loadedCommands = table
client.mongoose = require('./utils/mongoose');
readdirSync('./commands/').forEach(async dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`./commands/${dir}/${file}`);

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow('' + file, '✅ Loaded! ');
            } else {
                table.addRow('' + file, '❌ -> Command failed to load, please check your work again! ');
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases))
                pull.aliases.forEach(alias => {
                    return client.aliases.set(alias, pull.name);
                });
        }
    })
var rp = require("request-promise-core");
var bodyParser= require("body-parser");







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
client.on('rateLimit', console.log)
app.get("/", (req, res)=>{
  
  
  res.send(table.toString())
})
app.post("/upvote", (req, res) => {
  console.dir(req.body)
})

client.login(process.env.TOKEN)
client.mongoose.init();
app.listen(1234)