const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");

//Envoi d'une image de l'utilisateur ping avec un chapeau bunny
module.exports = async (message, client) => {

    //Récupération de l'avatar
    let member = message.mentions.members.first() || client;
    let avatar = await Canvas.loadImage(member.user.displayAvatarURL());

    let avatarPoster = await Canvas.loadImage(message.author.displayAvatarURL());

    //Création de l'image à compléter
    const canvas = Canvas.createCanvas(731, 660);
    const context = canvas.getContext('2d');

    //Ajout du fond
    const background = await Canvas.loadImage('./images/gratz.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Ajout de l'avatar
    context.rotate(0.07);
    context.drawImage(avatarPoster, 135, 30, 150, 150);
    context.rotate(-0.1);
    context.drawImage(avatar, 430, 120, 150, 150);

    //Envoi de l'image
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    message.channel.send({ files: [attachment] });
}