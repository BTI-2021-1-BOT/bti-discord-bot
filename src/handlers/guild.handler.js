const { roleTriggers } = require("../enums/guild.enums");

module.exports = ({ event, messageId, emoji }) => {
  if (
    (event === "MESSAGE_REACTION_ADD" || event === "MESSAGE_REACTION_REMOVE") &&
    messageId === process.env.GUILD_MESSAGE_ID &&
    Object.keys(roleTriggers).indexOf(emoji) !== -1
  ) {
    return true;
  }

  return false;
};
