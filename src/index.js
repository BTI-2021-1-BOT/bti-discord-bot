require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Iniciou!");
});

client.on("message", (message) => {
  if (message.content === "!teste") {
    message.reply("Prestou")
  }
});

client.on('raw', async data => {
  //O evento raw faz o registro de tudo que acontece no Discord. O data.t é responsável pelo nome das ações. Exemplo "MESSAGE_CREATED"
  //Filtrando para checar apenas se a ação é de adicionar ou remover reação
  if (data.t !== "MESSAGE_REACTION_ADD" && data.t !== "MESSAGE_REACTION_REMOVE") return;
  //data.d é responsável por armazenar o conteúdo da ação
  //Checando se essa ação de adicionar ou remover reação está acontecendo na mensagem específica de dar cargo
  if (data.d.message_id !== "id da mensagem aqui") return;

  let server = client.guilds.get("id do servidor aqui");
  let member = server.members.get(data.d.user_id);
  let role1 = server.roles.get("id do cargo1"),
    role2 = server.roles.get("id do cargo 2");
  if (data.t === "MESSAGE_REACTION_ADD") {
    //Colocar uma das opções ao lado dentro do if, dependendo se for emoji nativo do Discord ou emoji personalizado: data.d.emoji.name ou data.d.emoji.id, respectivamente.
    if ("" === "id do cargo 1") {
      //Checando se o usuário já tem o cargo para evitar erros.
      if (member.roles.has(role1)) return;
      //Adicionando ao membro que executou o evento o cargo 1
      member.addRole(role1);
    } else if ("" === "id do cargo 2") {
      if (member.roles.has(role2)) return;
      member.addRole(role2);
    }
  } else if (data.t === "MESSAGE_REACTION_REMOVE") {
    if ("" === "id do cargo 1") {
      if (!member.roles.has(role1)) return;
      member.removeRole(role1);
    } else if ("" === "id do cargo 2") {
      if (!member.roles.has(role2)) return;
      member.removeRole(role2);
    }
  }
});

client.login(process.env.TOKEN);
