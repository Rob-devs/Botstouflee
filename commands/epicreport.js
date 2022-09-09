const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

//Fonction transformant l'icone générée par Epic Report en icone pour le rapport Botstouflee
function getCircleFromSquare(square) {
    switch (square) {
        case "🟥":
            return "🔴";
        case "🟦":
            return "🔵";
        case "🟩":
            return "🟢";
        case "🟨":
            return "🟡";
        case "🟪":
            return "🟣";
        default:
            return "⚪";
    };
};

//Formatage selon les sets et informations additionnels
function getOtherInfos(sets, commentary) {
    let infos = "";

    if (sets.length > 0) {
        infos += "\n" + sets;
    }
    if (commentary.length > 0) {
        infos += "\n" + commentary;
    }

    return infos;
};

//Réinterpréter un rapport Epic Report
module.exports = (message) => {

    //Construction des objets
    var enemyTowerName = "";
    var enemys = [
        {
            name: "**?**",
            type: "⚪",
            speed: "(**?** SPD)",
            hp: "**?**",
            artifact: "`?`",
            sets: "",
            commentary: ""
        },
        {
            name: "**?**",
            type: "⚪",
            speed: "(**?** SPD)",
            hp: "**?**",
            artifact: "`?`",
            sets: "",
            commentary: ""
        },
        {
            name: "**?**",
            type: "⚪",
            speed: "(**?** SPD)",
            hp: "**?**",
            artifact: "`?`",
            sets: "",
            commentary: ""
        },
        {
            name: "**?**",
            type: "⚪",
            speed: "(**?** SPD)",
            hp: "**?**",
            artifact: "`?`",
            sets: "",
            commentary: ""
        },
        {
            name: "**?**",
            type: "⚪",
            speed: "(**?** SPD)",
            hp: "**?**",
            artifact: "`?`",
            sets: "",
            commentary: ""
        },
        {
            name: "**?**",
            type: "⚪",
            speed: "(**?** SPD)",
            hp: "**?**",
            artifact: "`?`",
            sets: "",
            commentary: ""
        },
    ];

    //Lecture du message Epic Report
    const lines = message.content.split("\n");
    if (lines.length < 32) {
        message.react('🟥');
        message.channel.send("Format du rapport invalide");
        return;
    }
    console.log(lines);
    var line = lines.shift(); //[Epic Report]
    line = lines.shift(); //Sauts de ligne
    line = lines.shift();
    //Nom de la tour adverse s'il y en a un
    if (line.startsWith("__**")) {
        enemyTowerName = line;
        line = lines.shift(); //Sauts de ligne
        line = lines.shift();
    }
    //Saut de la partie "Turn .."
    while (lines.length > 0 && !(/.*__\*\*.*\*\*__.*/.test(line))) {
        line = lines.shift();
    };
    //Lecture des 6 personnages
    for (let i = 0; i < 6; i++) {
        let words = line.split("__");
        if (words.length > 2) {
            enemys[i].type = getCircleFromSquare(words[0].trim());
            enemys[i].name = words[1];
            enemys[i].speed = words[2];
        }
        if (lines.length > 0) line = lines.shift();
        if (line.length > 0) {
            enemys[i].hp = line.substring(2);
        }
        if (lines.length > 0) line = lines.shift();
        if (line.length > 0) {
            if (/.*`.*`.*/.test(line)) {
                enemys[i].artifact = line.substring(2);
            } else {
                enemys[i].sets = line.substring(2);
                if (lines.length > 0) line = lines.shift();
                enemys[i].artifact = line.substring(2);
            }
        }
        if (lines.length > 0) line = lines.shift();
        if (line.length > 0 && (/.*\*.*\*.*/.test(line))) {
            enemys[i].commentary = line.substring(2);
        }
        //Saut de la partie "Turn .."
        while (lines.length > 0 && !(/.*__\*\*.*\*\*__.*/.test(line))) {
            line = lines.shift();
        };
    }

    //Construction des nouveaux messages
    const turn1 = new Discord.EmbedBuilder()
        .setTitle("✦― **Turn 1** ―――――――――――――✦")
        .setColor(0xff2929)
        .addFields([
            {
                name: enemys[0].type + " " + enemys[0].name + " " + enemys[0].speed,
                value: enemys[0].hp + " | " + enemys[0].artifact + getOtherInfos(enemys[0].sets, enemys[0].commentary),
                inline: false
            },
            {
                name: enemys[1].type + " " + enemys[1].name + " " + enemys[1].speed,
                value: enemys[1].hp + " | " + enemys[1].artifact + getOtherInfos(enemys[1].sets, enemys[1].commentary),
                inline: false
            },
            {
                name: enemys[2].type + " " + enemys[2].name + " " + enemys[2].speed,
                value: enemys[2].hp + " | " + enemys[2].artifact + getOtherInfos(enemys[2].sets, enemys[2].commentary),
                inline: false
            }
        ]);

    const turn2 = new Discord.EmbedBuilder()
        .setTitle("✦― **Turn 2** ―――――――――――――✦")
        .setColor(0x6600ff)
        .setTimestamp(Date.now())
        .setFooter({
            iconURL: message.author.displayAvatarURL(),
            text: "Written by " + message.author.tag
        })
        .addFields([
            {
                name: enemys[3].type + " " + enemys[3].name + " " + enemys[3].speed,
                value: enemys[3].hp + " | " + enemys[3].artifact + getOtherInfos(enemys[3].sets, enemys[3].commentary),
                inline: false
            },
            {
                name: enemys[4].type + " " + enemys[4].name + " " + enemys[4].speed,
                value: enemys[4].hp + " | " + enemys[4].artifact + getOtherInfos(enemys[4].sets, enemys[4].commentary),
                inline: false
            },
            {
                name: enemys[5].type + " " + enemys[5].name + " " + enemys[5].speed,
                value: enemys[5].hp + " | " + enemys[5].artifact + getOtherInfos(enemys[5].sets, enemys[5].commentary),
                inline: false
            }
        ]);

    //Envoi des nouveaux messages
    if (enemyTowerName.length > 0) {
        message.channel.send(enemyTowerName);
    }
    message.channel.send({ embeds: [turn1, turn2] })
    message.delete();
}