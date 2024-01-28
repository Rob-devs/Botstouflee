const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");
const loadUserAvatar = require("../utils/loadUserAvatar");

module.exports = async (interaction) => {
  //Récupération de l'avatar
  let avatar = await loadUserAvatar(interaction.options.getUser("user"));

  const canvas = Canvas.createCanvas(500, 500);
  const context = canvas.getContext("2d");

  context.drawImage(avatar, 100, 0, 500, 500);

  const background = await Canvas.loadImage("./images/hug.png");
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  const attachment = new AttachmentBuilder(await canvas.encode("png"), {
    name: "profile-image.png",
  });
  interaction.reply({ files: [attachment] });
};
