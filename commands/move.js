const {
  default: invalidCommandError,
} = require("../utils/error/invalidCommandError");
const {
  default: noChannelFoundError,
} = require("../utils/error/noChannelFoundError");

//Déplacement d'un message envoyé dans le channel spécifié
module.exports = async (interaction) => {
  const channelOption = interaction.options.getChannel("channel");
  const keepOption = interaction.options.getBoolean("keep");
  const messageOption = interaction.options.getString("message");
  const imageOption = interaction.options.getAttachment("image");

  let newMessage = messageOption || "I was told to move this here :";
  const image = imageOption ? imageOption.url : null;

  if (newMessage.includes("https://twitter.com/")) {
    newMessage = newMessage.replace(
      "https://twitter.com/",
      "https://vxtwitter.com/"
    );
  } else if (newMessage.includes("https://x.com/")) {
    newMessage = newMessage.replace("https://x.com/", "https://vxtwitter.com/");
  }

  if (channelOption) {
    try {
      await channelOption.send({ content: newMessage });
      if (image) {
        await channelOption.send({ files: [image] });
      }

      if (keepOption === false) {
        await interaction.reply({
          content: "✅ Content moved and original message deleted.",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "✅ Content moved.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "🟥 Failed to move content.",
        ephemeral: true,
      });
    }
  } else {
    await interaction.reply({
      content:
        "🟥 No permission to send messages in the chosen channel or channel is not a text channel.",
      ephemeral: true,
    });
  }
};
