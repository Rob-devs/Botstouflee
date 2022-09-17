const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder } = require("discord.js");

module.exports = async (message) => {

    let punch = './images/punch.png';

    //Récupération de l'avatar
    let member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
    let avatar;

    if (member.user.id == require("../utils/botID.js")) {
        avatar = await Canvas.loadImage(message.author.displayAvatarURL());
        punch = './images/punchback.png'
    }
    else {
        avatar = await Canvas.loadImage(member.user.displayAvatarURL());
    }

    const canvas = Canvas.createCanvas(600, 500);
    const context = canvas.getContext('2d');

    context.drawImage(avatar, 100, 0, 500, 500);

    const background = await Canvas.loadImage(punch);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
    await message.channel.send({ files: [attachment] });

    if (punch == './images/punchback.png') {
        message.channel.send("**KNOW YOUR PLACE !!**");
    }
    else {
        message.channel.send("**Correct your posture**");
    }
}