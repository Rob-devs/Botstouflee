const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");

//Envoi d'une image de l'utilisateur ping avec un chapeau bunny
module.exports = async (message, args, client) => {

    let avatar;
    //Si pas d'utilisateur ping
    if (args.length < 1 || !(/<@.*>/.test(args[0]))) {
        //Récuparation de l'avatar de l'auteur
        avatar = await Canvas.loadImage(message.author.displayAvatarURL());
    }
    //Sinon
    else {
        //Récupération de l'avatar de l'utilisateur
        let userID = args.shift();
        userID = userID.substring(2, userID.length - 1);
        avatar = await Canvas.loadImage(client.users.cache.find(user => user.id === userID).displayAvatarURL());
    }

    //Création de l'image à compléter
    const canvas = Canvas.createCanvas(400, 650);
    const context = canvas.getContext('2d');

    //Ajout de l'avatar
    context.drawImage(avatar, 0, 250, 400, 400);

    //Ajout du chapeau bunny
    const background = await Canvas.loadImage('./images/hat.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Envoi de l'image
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    message.channel.send({ files: [attachment] });
}