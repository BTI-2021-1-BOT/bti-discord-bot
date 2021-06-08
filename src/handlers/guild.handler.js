const { roleTriggers } = require("../enums/guild.enums");
const messages = require("../utils/messages.utils");

module.exports = (data) => {
  const eventType = data.t;
  if (
    (eventType === "MESSAGE_REACTION_ADD" ||
      eventType === "MESSAGE_REACTION_REMOVE") &&
    data.d.message_id === messages.guildReaction &&
    Object.keys(roleTriggers).indexOf(data.d.emoji.name) !== -1
  ) {
    return true;
  }

  return false;
};
