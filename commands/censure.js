const Discord = require("discord.js");

//Combattre la censure des vilains
module.exports = async (message) => {

    let logs = await message.guild.fetchAuditLogs({ type: 72 });
    let entry = logs.entries.first();

    const whitelist = Object.keys(require("../utils/listID.js").whitelist).map(function (key) {
        return (require("../utils/listID.js").whitelist)[key];
    });

    //Si c'est un vilain qui a supprimé le message
    if (!whitelist.some(id => id == entry.executor.id)) {
        message.channel.send({
            content: "Écoutes-moi bien **" + entry.executor.username + "**, moi tu me censures pas !!",
            files: ['./images/censure.png']
        });
    }
}