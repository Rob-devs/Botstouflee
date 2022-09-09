//Envoi d'un gif et d'un message
module.exports = (message) => {
    message.reply("COMPLETE");
    message.channel.send("https://cdn.discordapp.com/emojis/952260601198026792.gif?size=96&quality=lossless");
}