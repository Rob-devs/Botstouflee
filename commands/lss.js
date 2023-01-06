const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");

//Envoi d'une image de l'utilisateur ping avec un chapeau bunny
module.exports = async (message, command) => {

    //Récupération de l'avatar
    let member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
    let avatar = await Canvas.loadImage(member.user.displayAvatarURL());

    //Création de l'image à compléter
    const canvas = Canvas.createCanvas(320, 320);
    const context = canvas.getContext('2d');

    //Ajout du fond
    const background = await Canvas.loadImage('./images/lss.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    //Ajout de l'avatar
    context.drawImage(avatar, 52, 108, 212, 212);

    let phrases;

    //Envoi d'un message
    if (command != 'lss') {
        phrases = [
            "*Mdr elle existe pas cette commande*",
            "*Attention t'as fait une faute*",
            "*C'est parti !!*",
            "*connais pas*",
            "*What can I say except no*",
            "*je crois pas non*",
            "*(ou pas)*",
            "*Tu as activé ma carte piège !!*",
        ];
    }
    else {
        phrases = [
            "**Gloire au Leader Suprême Soowchou !!**",
            "**DEATH TO OPPOSE**",
            "**LSS pour tous et tous pour LSS !!**",
            "**La victoire ou la mort !!**",
            "**Personne n'est plus fort que le maître !**",
            "**Que de la bienveillance, ignorons les hérétiques !!**",
            "**Un pouvoir bien trop grand pour être ignoré !**",
            "**LSS, LSS, LSS !!!**",
        ];
    }

    let random = Math.floor(Math.random() * phrases.length);
    message.reply(phrases[random]);

    //Envoi de l'image
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    message.channel.send({ files: [attachment] });
}