module.exports = (message) => {
  message.react("🟥");
  message.channel.send("Invalid command");
};
