//Envoi d'un message et d'une image
module.exports = (message) => {
    message.reply("**feur**");
    message.channel.send({ files: ['./images/UltraBunny.png'] });
}