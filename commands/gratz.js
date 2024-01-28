const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (interaction) => {
  //Récupération de l'avatar;
  let avatar = await require("../utils/loadUserAvatar")(
    interaction.options.getUser("user")
  );
  let avatarPoster = await require("../utils/loadUserAvatar")(interaction.user);

  //Création de l'image à compléter
  const canvas = Canvas.createCanvas(731, 660);
  const context = canvas.getContext("2d");

  //Ajout du fond
  const background = await Canvas.loadImage("./images/gratz.png");
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  //Ajout de l'avatar
  context.rotate(0.07);
  context.drawImage(avatarPoster, 135, 30, 150, 150);
  context.rotate(-0.1);
  context.drawImage(avatar, 430, 120, 150, 150);

  //Envoi de l'image
  const attachment = new AttachmentBuilder(await canvas.encode("png"), {
    name: "profile-image.png",
  });
  interaction.channel.send({ files: [attachment] });
};
