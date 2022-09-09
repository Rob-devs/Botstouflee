module.exports = async (message) => {

    let random = Math.floor(Math.random() * 101);

    let msg = "*Calcul des chances de succès en cours...*\n\n[**";
    if (random < 10) {
        msg += " ";
    }
    msg += random.toString() + "%** `";

    var i;
    for (i = 0; i < random; i += 2) {
        msg += "█";
    }
    for (j = i; j < 101; j += 2) {
        msg += "_";
    }
    msg += "` ]\n\n";

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


    message.channel.send(msg);

}