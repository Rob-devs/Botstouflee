//Envoi le % de succès d'un message envoyé
module.exports = async (message, args, client) => {

    //Nombre aléatoire entre 0 et 100
    let random = Math.floor(Math.random() * 101);

    //Construction du message
    let msg = "*Calcul des chances de succès en cours...*\n";

    //Message envoyé par l'utilisateur
    newMessage = "";
    //Pour chaque mot
    args.forEach(element => {
        //Si c'est un ping d'utilisateur
        if ((/<@.*>/.test(element))) {
            //Conversion en nom
            newMessage += require("../utils/nameFromID.js")(element, client);
        }
        //Sinon
        else {
            //Ajout du mot
            newMessage += element.replace(/[*`_~]/g, '');
        }
        //Espacement entre les mots
        newMessage += " ";
    });
    //Si le message utilisateur n'est pas vide
    if (newMessage != "") {
        newMessage = newMessage.trim();
        msg += "*Demande :* 〔" + newMessage + "〕\n";
    }

    msg += "\n[**";

    //Espacement si seulement 1 caractère (chiffre)
    if (random < 10) {
        msg += " ";
    }
    msg += random.toString() + "%** `";

    //Construction de la barre de progression
    var i;
    for (i = 0; i < random; i += 2) {
        msg += "█";
    }
    for (j = i; j < 100; j += 2) {
        msg += "_";
    }
    msg += "` ]\n\n";

    //Ajout du message selon la valeure obtenue
    if (random == 100)
        msg += "Utilisation parfaite de la méthode";
    else if (random > 95)
        msg += "Incroyable CHAVAIS CHAVAIS !!";
    else if (random > 85)
        msg += "Énormes chances de succès !!";
    else if (random > 60)
        msg += "Pas mal !!";
    else if (random > 40)
        msg += "Tu vas y arriver !!";
    else if (random > 15)
        msg += "J'ai vu pire let's go !!";
    else if (random > 5)
        msg += "Y croire est le premier pas vers la réussite !!";
    else
        msg += "God is dead..."


    //Envoi du message
    message.reply(msg);

}