const Discord = require("discord.js");

//Combattre la censure des vilains
module.exports = async (message) => {

    let logs = await message.guild.fetchAuditLogs({ type: 72 });
    let entry = logs.entries.first();

    const listcensure = Object.keys(require("../utils/listID.js").censure).map(function (key) {
        return (require("../utils/listID.js").censure)[key];
    });

    //Si c'est un vilain qui a supprimé le message
    if (listcensure.some(id => id == entry.executor.id)) {
        //Réponse aléatoire
        let files = [
            "RandPic1.png",
            "RandPic8.png",
        ];

        let random = Math.floor(Math.random() * files.length);
        message.channel.send({
            content: "🔺 J'ai été censuré par **" + entry.executor.username + "** !! 🔺",
            files: ['./images/' + files[random]]
        });
    }
}