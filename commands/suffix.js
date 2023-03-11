discord = require('discord.js');

//Détection du suffixe du message envoyé et réponse en conséquence
module.exports = (message) => {

    //On ne traite pas les emotes et les gifs
    if ((message.content.charAt(0) == ':' && message.content.endsWith(':')) ||
        message.content.slice(0, 8) == "https://") {
        return;
    }

    //On ne traite pas si utilisateur whitelisté
    const whitelist = Object.keys(require("../utils/listID.js").whitelist).map(function (key) {
        return (require("../utils/listID.js").whitelist)[key];
    });
    let whitecheck = false;
    whitelist.forEach(id => {
        if (message.author.id == id) whitecheck = true;
    })
    if (whitecheck) return;

    //Supression des caractères spéciaux et normalisation
    let txt = message.content.replace(/[\W_]+/g, " ").trim().toLowerCase();

    //Réactions aléatoires
    let jokeCheck = Math.floor(Math.random() * 100) > 98;
    let rdmMessage = Math.floor(Math.random() * 250) == 0;
    let cleverCheck = Math.floor(Math.random() * 350) == 0;

    const reactions = require("../utils/reactions.js");
    const keys = Object.keys(reactions);

    //Réaction FEUR
    if (txt.endsWith("quoi") ||
        txt.endsWith("koi") ||
        txt.endsWith("koa") ||
        txt.endsWith("kwa") ||
        txt.endsWith("qwa") ||
        txt.endsWith("kwoi") ||
        txt == "coi" ||
        txt.endsWith(" coi")) {
        message.react('🇫');
        message.react('🇪');
        message.react('🇺');
        message.react('🇷');
    }
    else if (jokeCheck) {
        //Réactions diverses
        keys.forEach(element => {
            if (txt.endsWith(element)) {
                let random = Math.floor(Math.random() * reactions[element].length);
                message.reply(getStyle(reactions[element][random] + " " + getPhrase()));
            }
        });
    }
    else if (rdmMessage) {
        //Réponse aléatoire
        let files = [
            "RandPic1.png",
            "RandPic2.png",
            "RandPic3.png",
            "RandPic4.png",
            "RandPic5.png",
            "RandPic6.png",
            "RandPic7.png",
            "RandPic8.png",
            "RandPic9.png",
            "RandGif1.gif",
            "RandGif2.gif",
            "RandGif3.gif",
        ];
        let random = Math.floor(Math.random() * files.length);

        message.channel.send({
            files: ['./images/' + files[random]]
        });
    }
    else if (cleverCheck) {
        //Redirection vers Cleverbot
        require('./cleverbot.js')(message, message.content.trim().split(/ +/));
    }
}

//Complément de réponse aléatoire
function getPhrase() {

    let phrases = [
        "",
        "je crois",
        "il me semble",
        "à prioris",
        "non ?",
        "MDR",
        "on m'a dit",
        "!!",
        "d'après wikipédia",
        "AHAHA",
        "ptdrrrr",
        "mais pas sur",
        "peut-être",
        "normalement",
        "j'ai vu ça à la télé",
        "PTDR",
        "je pense",
        "selon la Nasa",
    ];

    let random = Math.floor(Math.random() * phrases.length);

    return phrases[random];
};

//Style de réponse aléatoire
function getStyle(text) {
    let random = Math.floor(Math.random() * 100);

    if (Math.floor(Math.random() * 2) == 0) {
        text = text.charAt(0).toUpperCase() + text.slice(1);
    }

    text.trim();

    if (random > 90) {
        return "(" + text.trim() + ")";
    }
    else if (random > 70) {
        return "*" + text + "*";
    }
    else if (random > 60) {
        return text + "\n\ndésolé...";
    }
    else if (random > 50) {
        return text + "\n\nn'hésite pas à utiliser &quoi pour plus d'informations !!";
    }
    else if (random > 40) {
        return "**" + text + "**";
    }
    else if (random > 35) {
        return text + "\n\nhttps://r.mtdv.me/kmuyWljLjG";
    }

    return text;
};