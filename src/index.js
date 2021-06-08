require("dotenv").config();

const Discord = require("discord.js");

const guildHandler = require("./handlers/guild.handler");
const { roleTriggers, roles } = require("./enums/guild.enums");
const { hasRole } = require("./utils/guild.utils");

const client = new Discord.Client();
const server = await client.guilds.fetch("851492197941772298");

client.once("ready", () => {
  console.log("Iniciou!");
});

client.on("guildMemberAdd", (member) => {
  member.send(
    "Olá, seja bem vindo ao servidor de BTI 2021.1!! 🥳\nClique no link abaixo e vá para a mensagem de escolha de cargos!\nhttps://discord.com/channels/851492197941772298/851644612896489503/851645465388122132"
  );
});

async function mutateRole(event, member, role) {
  const currentRole = roles[role];

  const roleStatus = hasRole(member._roles, currentRole);

  if (event === "MESSAGE_REACTION_ADD") {
    if (!roleStatus) {
      return await member.roles.add(currentRole);
    }
  } else if (roleStatus) {
    return await member.roles.remove(currentRole);
  }
}

client.on("raw", async (data) => {
  if (
    guildHandler({
      event: data.t,
      messageId: data.d.message_id,
      emoji: data.d.emoji.name,
    })
  ) {
    const member = await (
      await server.members.fetch(data.d.user_id)
    ).fetch(true);
    await mutateRole(data.t, member, roleTriggers[data.d.emoji.name]);
  }
});

client.login(process.env.TOKEN);
