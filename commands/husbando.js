//Envoie un contenu husbando aléatoire
module.exports = (message, args) => {
    let husbandos = {
        "RioletGOD": "YOUR LIFE... MEANS NOTHING",
        "StrazeGOD": "DESTINY... CANNOT ESCAPE.. MY SWORD !",
        "ZahhakGOD": "I'LL REMOVE YOU... LIKE YOU NEVER EVEN EXISTED",
        "KayronGOD": "A BLOODBATH, DELIGHTFUL AGONY",
        "CavelGOD": "FOR AN INSIGNIFICANT PERSON LIKE YOU... DEATH IS TOO KIND A GIFT",
    };

    //Construction du nom donné en paramètres
    let nom = "";
    args.forEach(element => {
        nom += element + " ";
    });

    let randomHusbando;

    switch (nom.trim().toLowerCase()) {
        case "rio":
        case "ml violet":
        case "riolet":
            randomHusbando = Object.keys(husbandos)[0];
            break;
        case "straze":
            randomHusbando = Object.keys(husbandos)[1];
            break;
        case "zahhak":
            randomHusbando = Object.keys(husbandos)[2];
            break;
        case "kayron":
            randomHusbando = Object.keys(husbandos)[3];
            break;
        case "ml pavel":
        case "cavel":
            randomHusbando = Object.keys(husbandos)[4];
            break;
        default:
            randomHusbando = Object.keys(husbandos)[Math.floor(Math.random() * Object.keys(husbandos).length)];
            break;
    }

    message.reply({
        content: "***" + husbandos[randomHusbando] + "***",
        files: ['./images/' + randomHusbando + '.gif', './audio/' + randomHusbando + '.mp3']
    });
}