//Envoie une réaction aléatoire
module.exports = (message, args) => {
    let reactions = [
        "pic_armscrossed.png",
        "pic_sad.png",
        "pic_sadhug.png",
        "pic_hello.png",
        "pic_paquet.png",
        "pic_phone.png",
        "pic_racist.png",
        "pic_sleepy.png",
        "pic_happydog.png",
        "pic_soldier.png",
        "pic_souci.png",
        "gif_driving.gif",
        "gif_duck.gif",
        "gif_gamble.gif",
        "gif_noted.gif",
        "gif_tasty.gif",
        "police.png",
    ];

    //Construction du nom donné en paramètres
    let nom = "";
    args.forEach(element => {
        nom += element + " ";
    });

    let randomReaction;

    switch (nom.trim().toLowerCase()) {
        case "sleep":
        case "sleepy":
        case "peeposleepytime":
            randomReaction = "pic_sleepy.png";
            break;
        case "paquet":
        case "belle bite":
        case "bellebite":
        case "bite":
            randomReaction = "pic_paquet.png";
            break;
        case "bunny":
        case "soldier":
        case "bistou":
        case "bunny bistou":
        case "bunnybistou":
            randomReaction = "pic_soldier.png";
            break;
        case "souci":
        case "soucis":
        case "soucimental":
        case "mister v":
        case "misterv":
            randomReaction = "pic_souci.png";
            break;
        case "gamble":
        case "money":
        case "game":
            randomReaction = "gif_gamble.gif";
            break;
        case "racist":
        case "raciste":
            randomReaction = "pic_racist.png";
            break;
        case "phone":
        case "bunnyphone":
        case "bunny phone":
            randomReaction = "pic_phone.png";
            break;
        case "hello":
        case "call":
            randomReaction = "pic_hello.png";
            break;
        case "arms":
        case "armscrossed":
        case "arms crossed":
        case "bunnyarmscrossed":
        case "bunny arms crossed":
            randomReaction = "pic_armscrossed.png";
            break;
        case "hug":
        case "bunnyhugsadcat":
            randomReaction = "pic_sad.png";
            break;
        case "sad":
        case "sadcat":
        case "peepobunnysadcat":
        case "sadge":
            randomReaction = "pic_sad.png";
            break;
        case "doudz":
        case "doggo":
        case "dog":
        case "doge":
        case "happy":
        case "happydog":
        case "happy dog":
        case "happy doge":
            randomReaction = "pic_happydog.png";
            break;
        case "tasty":
        case "hungry":
        case "eat":
        case "eating":
        case "tastyge":
            randomReaction = "gif_tasty.gif";
            break;
        case "noted":
        case "note":
        case "notes":
        case "noting":
            randomReaction = "gif_noted.gif";
            break;
        case "speed":
        case "car":
        case "drive":
        case "driving":
            randomReaction = "gif_driving.gif";
            break;
        case "duck":
        case "duck dance":
            randomReaction = "gif_duck.gif";
            break;
        case "police":
            randomReaction = "police.png";
            break;
        default:
            randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
            break;
    }

    message.channel.send({
        files: ['./images/' + randomReaction]
    });
}