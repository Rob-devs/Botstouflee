//Ajoute "choupichou" derrière le nom de l'utilisateur ping
module.exports = (message, args, client) => {

    let member = message.mentions.members.first();

    //Si aucun utilisateur n'a été ping
    if (!member) {
        //Commande invalide
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }

    //Sinon on envoie le message
    message.channel.send(
        member.displayName + "choupichou plus choupi des choupiz!!");
}