require("dotenv").config();

const Discord = require("discord.js");

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Iniciou!");
});

client.on("message", (message) => {
    if(message.content === "!teste") {
        message.reply("Prestou")
    }
})

client.login(process.env.TOKEN);
