//Envoie une citation aléatoire
module.exports = (message) => {

    //Récupération des citations
    const quotes = require("../utils/quotes.js");

    //Recherche d'une clé (contenu de la citation) aléatoire
    const keys = Object.keys(quotes);
    let random = Math.floor(Math.random() * keys.length);

    //Envoi du message
    message.channel.send("*\""
        + keys[random] //Contenu de la citation
        + "\"*" + "\n\n**"
        + quotes[keys[random]] //Auteur de la citation
        + "**");
}