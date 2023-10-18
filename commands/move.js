//Déplacement d'un message envoyé dans le channel spécifié
module.exports = async (message, command, args, client) => {

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

    //Récupération de la liste des channels où envoyer le message
    while (args.length > 0 && (/<#.*>/.test(args[0]))) {
        let chanID = args.shift();
        chanID = chanID.substring(2, chanID.length - 1);
        chanIDs.push(chanID);
    }
    //Si ni image ni contenu
    if (args.length == 0 && (image == null)) {
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }

    //Construction du message
    newMessage = "";
    var linkReplaced = false;
    args.forEach(element => {
        newMessage += element + " ";
    });
    if (newMessage == "") {
        newMessage += "On m'a dit de transférer ça :"
    }
    if (newMessage.includes('https://twitter.com/')) {
        newMessage = newMessage.replace('https://twitter.com/', 'https://vxtwitter.com/');
        linkReplaced = true;
    }  
    else if (newMessage.includes('https://x.com/')) {
        newMessage = newMessage.replace('https://x.com/', 'https://vxtwitter.com/');
        linkReplaced = true;
    }  

    //Envoi du message à chaque channel
    channels = '';
    chanIDs.forEach(ID => {
        let newChannel = client.channels.cache.get(ID);
        //Envoi du message si le chan existe
        if (newChannel) {
            if (newChannel.permissionsFor(client.user).has('SEND_MESSAGES')) {
                newChannel.send(newMessage);
                if (image != null)
                    newChannel.send(image);
                done = true;
                channels += '<#' + newChannel + '> ';
            }
        }
        else {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
        }
    });
    //Si l'action s'est bien passée
    if (done) {
        if (command === "s") {
            message.delete();
        }
        else if (command === "g") {
            if (linkReplaced) {
                sentMessage = await message.channel.send(newMessage);
                sentMessage = await message.channel.send(channels);
                sentMessage.react('✅');
                message.delete();
            }
            else {
                message.react('✅');
            }
        }
    }
}