const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (interaction) => {
  let punch = "./images/punch.png";

  //Récupération de l'avatar
  let avatar;

  if (interaction.options.getUser("user").id == process.env.BOT_ID) {
    avatar = await require("../utils/loadUserAvatar")(interaction.user);
    punch = "./images/punchback.png";
  } else {
    avatar = await require("../utils/loadUserAvatar")(
      interaction.options.getUser("user")
    );
  }

  const canvas = Canvas.createCanvas(600, 500);
  const context = canvas.getContext("2d");

  context.drawImage(avatar, 100, 0, 500, 500);

  const background = await Canvas.loadImage(punch);
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const attachment = new AttachmentBuilder(await canvas.encode("png"), {
    name: "profile-image.png",
  });
  await interaction.reply({ files: [attachment] });

  if (punch == "./images/punchback.png") {
    interaction.channel.send("**KNOW YOUR PLACE !!**");
  } else {
    interaction.channel.send("**It's supper effective !!**");
  }
};
