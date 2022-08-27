module.exports = (message, command, args, client) => {

    if (!message.member.roles.cache.some(role => role.name === 'Modstouflee')) {
        message.react('🟥');
        message.channel.send("Il faut le rôle \"Modstouflee\" pour utiliser cette commande !");
        return;
    }

    //Image envoyé dans le message, null s'il n'y en a pas
    const image = message.attachments.first() ? message.attachments.first().url : null;

    //Test de validité de la commande
    if ((args.length < 2 || !(/<#.*>/.test(args[0]))) && (args.length < 1 || !(/<#.*>/.test(args[0])) || image === null)) {
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }

    //ID du / des channel(s) envoyé(s)
    let chanIDs = [];
    let done = false;

    while (args.length > 0 && (/<#.*>/.test(args[0]))) {
        let chanID = args.shift();
        chanID = chanID.substring(2, chanID.length - 1);
        chanIDs.push(chanID);
    }
    if (args.length == 0 && (image == null)) {
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }

    //Construction du message
    newMessage = "";
    args.forEach(element => {
        newMessage += element + " ";
    });
    if (newMessage == "") {
        newMessage += "On m'a dit de transférer ça :"
    }

    chanIDs.forEach(ID => {
        let newChannel = client.channels.cache.get(ID);
        //Envoi du message si le chan existe
        if (newChannel) {
            newChannel.send(newMessage);
            if (image != null)
                newChannel.send(image);
            done = true;
        }
        else {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
        }
    });
    if (done) {
        if (command === "g")
            message.react('✅');
        else
            message.delete();
    }
}