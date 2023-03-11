const fetch = require("node-fetch");

//Envoie un gif aléatoire
module.exports = async (message, args) => {

    //Construction de la recherche
    let filtre = "";
    args.forEach(element => {
        filtre += element + " ";
    });
    filtre.trim();
    if (filtre == "") {
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }

    const url = `https://api.tenor.com/v2/search?q=${filtre}&key=${process.env.TENOR_KEY}&limit=10`;
    const reponse = await fetch(url);
    const result = await reponse.json();

    //Si pas de résultat trouvé
    if (result.results.length == 0) {
        message.reply({
            content: "Désolé j'ai pas trouvé de gif pour ça",
            files: ['./images/RandPic1.png']
        });
    } //Sinon
    else {
        const index = Math.floor(Math.random() * result.results.length);

        message.channel.send(result.results[index].url);
    }
}