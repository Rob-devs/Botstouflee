module.exports = (message) => {
    let bunnygif = ["https://media.giphy.com/media/noAv4Zvd3PYUKWQVT3/giphy.gif",
        "https://media.discordapp.net/attachments/788046506388750416/934525925683523604/BUNNYSTRONG.gif",
        "https://media.discordapp.net/attachments/884346691631869952/949799068169801848/SPEEDSTOUFLEE_-_Copie_Trim.gif",
        "https://media.giphy.com/media/yD8PJRaqIYG19aV3MA/giphy-downsized-large.gif",
        "https://media.giphy.com/media/vKYDl1sU3jzztdsw8a/giphy-downsized-large.gif"];
    let random = Math.floor(Math.random() * bunnygif.length);

    message.channel.send(bunnygif[random]);
}