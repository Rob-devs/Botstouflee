const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");
const { join } = require('path')

//Envoi d'une image de l'utilisateur ping avec un chapeau bunny
module.exports = async (message, args) => {

    //Récupération de l'avatar
    let avatar = await Canvas.loadImage(message.author.displayAvatarURL());

    //Construction du texte
    let text = "";
    args.forEach(element => {
        text += element + " ";
    });
    if (text.length == 0) {
        text = "commandes vides"
    }

    //Création de l'image à compléter
    const canvas = Canvas.createCanvas(1080, 1072);
    const context = canvas.getContext('2d'); 

    //Ajout du fond
    const background = await Canvas.loadImage('./images/faute.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    Canvas.GlobalFonts.registerFromPath(join(__dirname, '..', 'commands', 'fonts', 'tintin.ttf'), 'tintin')

	context.font = '90px tintin';

	context.fillStyle = '#623b24';

	context.fillText(text, 450, 130);

    //Ajout de l'avatar
    context.rotate(0.12);
    context.drawImage(avatar, 500, 110, 200, 200);

    //Envoi de l'image
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    message.channel.send({ files: [attachment] });
}