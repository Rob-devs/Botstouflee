const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");

module.exports = async (message) => {

    //Récupération de l'avatar
    let member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
    let avatar = await Canvas.loadImage(member.user.displayAvatarURL());

    const canvas = Canvas.createCanvas(500, 500);
    const context = canvas.getContext('2d');

    context.drawImage(avatar, 100, 0, 500, 500);

    const background = await Canvas.loadImage('./images/hug.png');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    message.channel.send({ files: [attachment] });
}