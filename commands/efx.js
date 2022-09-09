//Envoi d'une image d'Alper aléatoire
module.exports = (message) => {

    //Tableau des liens des images disponibles
    let alper = ["./images/alper1.png",
        "./images/alper2.png",
        "./images/alper3.png",
        "./images/alper4.png"];
    let random = Math.floor(Math.random() * alper.length);

    //Envoi d'une image aléatoire via son lien
    message.channel.send({ files: [alper[random]] });
}