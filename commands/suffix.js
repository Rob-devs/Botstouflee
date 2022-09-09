//Détection du suffixe du message envoyé et réponse en conséquence
module.exports = (message) => {

    //Supression des caractères spéciaux et normalisation
    let txt = message.content.replace(/[\W_]+/g, " ").trim().toLowerCase();

    //Réaction FEUR
    if (txt.endsWith("quoi")) {
        message.react('🇫');
        message.react('🇪');
        message.react('🇺');
        message.react('🇷');
    }
}