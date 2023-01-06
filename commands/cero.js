//Envoie un contenu CERO aléatoire
module.exports = (message) => {
    let cerogif = [
        "https://media.discordapp.net/attachments/1009461305540878346/1058014375484608532/image0.gif",
        "https://media.discordapp.net/attachments/1009461305540878346/1058013227537137745/image0.gif",
        "https://tenor.com/view/bleach-anime-starrk-cero-gif-18452643",
        "https://media.discordapp.net/attachments/1009461305540878346/1058012637071421460/image0.gif",
        "https://tenor.com/view/grimmjow-impact-frame-bleach-impact-frame-gran-rey-cero-grimmjow-bleach-bleach-cero-gif-26819886",
        "https://tenor.com/view/bleach-nelliel-gif-20443832",
        "https://tenor.com/view/cero-azul-gif-20392768",
        "https://tenor.com/view/ulquiorra-hollow-ichigo-bleach-fight-gif-15172484",
    ];
    let random = Math.floor(Math.random() * cerogif.length);

    message.channel.send(cerogif[random]);
}