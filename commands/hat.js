const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");

module.exports = async (message, args, client) => {
    let avatar;
    if (args.length < 1 || !(/<@.*>/.test(args[0]))) {
        avatar = await Canvas.loadImage(message.author.displayAvatarURL());
    }
    else if (!(/<@.*>/.test(args[0]))) {
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }
    else {
        let userID = args.shift();
        userID = userID.substring(2, userID.length - 1);
        avatar = await Canvas.loadImage(client.users.cache.find(user => user.id === userID).displayAvatarURL());
    }

    const canvas = Canvas.createCanvas(400, 650);
    const context = canvas.getContext('2d');

    context.drawImage(avatar, 0, 250, 400, 400);

    const background = await Canvas.loadImage('./images/hat.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    message.channel.send({ files: [attachment] });
}