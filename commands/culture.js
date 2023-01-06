//Envoie une citation aléatoire
module.exports = (message, args) => {

    //Récupération des citations
    const quotes = require("../utils/quotes.js");

    //Liste des auteurs
    const keys = Object.keys(quotes);

    //Filtre
    let filtre = "";
    let filtered = false;

    //Auteur et citation aléatoires
    let randomAuthor;
    let randomQuote;


    //Si un utilisateur a été ping, on filtre avec 
    let member = message.mentions.members.first();
    if (member) {
        filtre = member.displayName;
    } //Sinon
    else {
        args.forEach(element => {
            filtre += element + " ";
        });
    }

    filtre = convert(filtre).trim();

    //Si on peut filtrer
    if (filtre) {
        keys.forEach(element => {
            if (convert(element) == filtre) {
                randomAuthor = element;
                filtered = true;
            }
        })
    }

    //Si on a filtré
    if (!filtered) {
        randomAuthor = Object.keys(quotes)[Math.floor(Math.random() * Object.keys(quotes).length)];
    }
    randomQuote = quotes[randomAuthor][Math.floor(Math.random() * quotes[randomAuthor].length)];

    //Envoi du message
    message.channel.send("*\""
        + randomQuote //Contenu de la citation
        + "\"*" + "\n\n**"
        + randomAuthor //Auteur de la citation
        + "**");
}

//Converti un texte en PascalCase
function convert(text) {
    return text.trim().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}