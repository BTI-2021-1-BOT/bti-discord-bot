require("dotenv").config();

const Discord = require("discord.js");

const guildHandler = require("./handlers/guild.handler");

const { roleTriggers, roles } = require("./enums/guild.enums");
const { hasRole } = require("./utils/guild.utils");

const strings = require("./utils/strings.utils");

const client = new Discord.Client();

client.once("ready", () => {
  console.log(
    process.env.NODE_ENV === "DEV"
      ? "Ambiente Desenvolvimento"
      : "Ambiente produção"
  );
});

client.on("guildMemberAdd", (member) => {
  member.send(strings.onMemberAdd);
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
  const server = await client.guilds.fetch("851492197941772298");
  if (guildHandler(data)) {
    const member = await (
      await server.members.fetch(data.d.user_id)
    ).fetch(true);
    await mutateRole(data.t, member, roleTriggers[data.d.emoji.name]);
  }
});

client.login(
  process.env.NODE_ENV === "DEV" ? process.env.DEV_TOKEN : process.env.TOKEN
);
