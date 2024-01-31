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
      let channelMessageOptions = { content: newMessage };
      if (image) {
        channelMessageOptions.files = [image];
      }

      await channelOption.send(channelMessageOptions);

      if (keepOption === false) {
        await interaction.reply({
          content: `✅ Content moved to channel ${channelOption} and original message deleted.`,
          ephemeral: true,
        });
      } else {
        let replyOptions = {
          content:
            `✅ Content moved to channel ${channelOption}` +
            (messageOption ? `: ${messageOption}` : "."),
          ephemeral: false,
        };

        if (image) {
          replyOptions.files = [image];
        }

        await interaction.reply(replyOptions);
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
