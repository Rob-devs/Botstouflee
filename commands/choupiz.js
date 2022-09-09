//Ajoute "choupichou" derrière le nom de l'utilisateur ping
module.exports = (message, args, client) => {

    //Si aucun utilisateur n'a été ping
    if (args.length < 1 || !(/<@.*>/.test(args[0]))) {
        //Commande invalide
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }

    //Sinon on envoie le message
    message.channel.send(
        //Conversion de l'ID de l'utilsateur en nom
        require("../utils/nameFromID.js")(args.shift(), client)
        + "choupichou plus choupi des choupiz!!");
}