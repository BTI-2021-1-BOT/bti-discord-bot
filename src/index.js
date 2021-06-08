require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Iniciou!");
});

client.on("guildMemberAdd", (member) => {
  member.send(
    "Olá, seja bem vindo ao servidor de BTI 2021.1!! 🥳\nClique no link abaixo e vá para a mensagem de escolha de cargos!\nhttps://discord.com/channels/851492197941772298/851644612896489503/851645465388122132"
  );
});

const roles = {
  veterano: "851552123295629322",
  integral: "851551088528457738",
  noturno: "851551357487546388",
};

const roleTriggers = {
  "🧓": "veterano",
  "🌅": "integral",
  "🌃": "noturno",
};

function hasRole(roles, searchRole) {
  return roles.some((role) => searchRole === role);
}

async function mutateRole(event, member, role) {
  if (event === "MESSAGE_REACTION_ADD" || event === "MESSAGE_REACTION_REMOVE") {
    const currentRole = roles[role];
    if (currentRole) {
      const roleStatus = hasRole(member._roles, currentRole);

      if (event === "MESSAGE_REACTION_ADD") {
        if (!roleStatus) {
          return await member.roles.add(currentRole);
        }
      } else if (roleStatus) {
        return await member.roles.remove(currentRole);
      }
    }
  }
}

client.on("raw", async (data) => {
  if (data.t !== "MESSAGE_REACTION_ADD" && data.t !== "MESSAGE_REACTION_REMOVE")
    return;

  if (data.d.message_id !== "851645465388122132") return;

  const server = await client.guilds.fetch("851492197941772298");
  const member = await (await server.members.fetch(data.d.user_id)).fetch(true);

  await mutateRole(data.t, member, roleTriggers[data.d.emoji.name]);
});

client.login(process.env.TOKEN);
