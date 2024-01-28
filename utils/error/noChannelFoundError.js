module.exports = (message) => {
  message.react("🟥");
  message.channel.send("No channel found");
};
