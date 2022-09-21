//Détection du suffixe du message envoyé et réponse en conséquence
module.exports = (message) => {

    //Supression des caractères spéciaux et normalisation
    let txt = message.content.replace(/[\W_]+/g, " ").trim().toLowerCase();

    //Réaction FEUR
    if (txt.endsWith("quoi") ||
        txt.endsWith("koi") ||
        txt.endsWith("koa") ||
        txt.endsWith("kwa") ||
        txt.endsWith("qwa")) {
        message.react('🇫');
        message.react('🇪');
        message.react('🇺');
        message.react('🇷');
    }
}