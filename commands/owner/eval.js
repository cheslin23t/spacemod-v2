const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

function clean(string) {
            if (typeof text === "string") {
                return string.replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203))
              } else {
                return string;
              }
        }
var arrayofsensitiveevals = ['token', 'client', 'process', 'env', 'ip', 'msg', 'mongo', 'db', 'mongoose', 'admins', 'data', 'map', 'find']
var { post } = require("node-superfetch");
const Admins = require('../../models/admin')
const mongoose = require('mongoose')
const discord = require('discord.js')
const express = require('express')
module.exports = {
    name: 'eval',
    category: 'owner',
    description: 'Runs javascript (owner only)',
    usage: `eval <true/false> <code>`,
    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
              try {

    const code = args.join(" ").replace(args[0], "")
    if (!code) return message.channel.send("Please include the code. Usage: eval <true/false> <code>");
    let evaled;
    var dmuser = false
    
    if (arrayofsensitiveevals.includes(code.toString().toLowerCase())) {
      var dmuser = true
    } else {
      var dmuser = false
    }
    evaled = eval(code);
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, {depth: 0});
    
    let output = clean(evaled);
    if (output.length > 1024) {
      // If the output was more than 1024 characters, we're gonna export them into the hastebin.
      const {body} = await post("https://hastebin.com/documents").send(output);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor(0x7289DA);
      // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
    } else {
      embed.addField("Output :outbox_tray:", "```" + output + "```").setColor(0x7289DA)
    }
    if(dmuser = true){
      if(args[0] == 'true'){
          message.delete({ timeout: 15000 })
          message.channel.send(embed).delete({ timeout: 15000 })
      }
      else if(args[0] == 'false') {
        message.delete({ timeout: 15000 })
        message.author.send(embed)
        message.channel.send("Sent you a dm as eval may contain private info")
        
      }
      else {
        message.lineReply("????  Plz make a true or false statement for dm in this channel or not :P")
      }
      
      
    }
    else{

    message.channel.send("Plz enable yer dms.");
    }
    
  } catch (error) {
    let err = clean(error);
    if (err.length > 1024) {
      // Do the same like above if the error output was more than 1024 characters.
      const {body} = await post("https://hastebin.com/documents").send(err);
      embed.addField("Output", `https://hastebin.com/${body.key}.js`).setColor("RED");
    } else {
      embed.addField("Output :outbox_tray:", "```bat" + err + "```").setColor("RED");
    }
    if(dmuser = true){
     if(args[0] == 'true'){
          message.channel.send(embed)
      }
      else{
        message.author.send(embed)
        message.channel.send("Sent you a dm as eval may contain private info")
      }
      
      
    }
}

            }
if(!guild){
              message.lineReply("you do not have the permission to use this command")
            }
            });
        
    }
}