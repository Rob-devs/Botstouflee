const Canvas = require("@napi-rs/canvas");
const { AttachmentBuilder } = require("discord.js");

//Envoi d'une image de l'utilisateur ping avec un chapeau bunny
module.exports = async (interaction) => {
  //Récupération de l'avatar
  let avatar = await require("../utils/loadUserAvatar")(
    interaction.options.getUser("user")
  );

  //Création de l'image à compléter
  const canvas = Canvas.createCanvas(400, 650);
  const context = canvas.getContext("2d");

  //Ajout de l'avatar
  context.drawImage(avatar, 0, 250, 400, 400);

  //Ajout du chapeau bunny
  const background = await Canvas.loadImage("./images/hat.png");
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  //Envoi de l'image
  const attachment = new AttachmentBuilder(await canvas.encode("png"), {
    name: "profile-image.png",
  });
  interaction.channel.send({ files: [attachment] });
};
