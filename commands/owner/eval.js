const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js')
const embed = new Discord.MessageEmbed()
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
    usage: `.eval <code>`,
    run: async (client, message, args) => {
        Admins.findOne({
            userID: message.author.id,
            level: "5"
        }, async (err, guild) => {
            if (err) console.error(err);
            if(guild){
              try {
    const code = args.join(" ");
    if (!code) return message.channel.send("Please include the code.");
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
      message.author.send(embed)
      message.channel.send("Sent you dm as eval may contain private info")
    }
    else{

    message.channel.send(embed);
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
      message.author.send(embed)
      message.channel.send("Sent you dm as eval may contain private info")
    }
    else{

    message.channel.send(embed);
    }
}

            }
if(!guild){
              message.reply("you do not have the permission to use this command")
            }
            });
        
    }
}