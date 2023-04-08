const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

//Création de la page d'aide
module.exports = async (message, prefixCmd) => {

    //Generate pages
    const pages = [];
    pages.push(new Discord.EmbedBuilder()
        .setTitle("**Liste des commandes**")
        .setColor(0xff2929)
        .setTimestamp(Date.now())
        .setDescription("*Les commandes utiles*")
        .setFooter({
            iconURL: message.author.displayAvatarURL(),
            text: "Demandé par " + message.author.tag
        })
        .addFields([
            {
                name: "🔴 __Général__",
                value: "**" + prefixCmd + "help :** Liste des commandes disponibles."
                    + "\n**" + prefixCmd + "info [@user] :** Toutes les infos des choupiz !!"
                    + "\n**" + prefixCmd + "quoi :** Définit un nombre `important` de règles `nécessaires`"
                    + "\n\n**" + "[Epic Report] :** Botstouflee converti automatiquement les rapports générés par Epic Report : "
                    + "https://play.google.com/store/apps/details?id=epic.report.epicreport\n",
                inline: false
            },
            {
                name: "🔴 __Gestion des messages__",
                value: "**" + prefixCmd + "c [message] :** Parle avec Botstouflee !!"
                    + "\n\n*Avec le rôle \"Modstouflee\" :*"
                    + "\n**" + prefixCmd + "g #channel1 #channel2.. [message | image] :** `Copie message` / `image` dans le(s) `channel(s)`."
                    + "\n**" + prefixCmd + "s #channel1 #channel2.. [message | image] :** `Déplace message` / `image` dans le(s) `channel(s)`.",
                inline: false
            },
        ]));
    pages.push(new Discord.EmbedBuilder()
        .setTitle("**Liste des commandes**")
        .setColor(0xff96fb)
        .setTimestamp(Date.now())
        .setDescription("*Les incontournables*")
        .setFooter({
            iconURL: message.author.displayAvatarURL(),
            text: "Demandé par " + message.author.tag
        })
        .addFields([
            {
                name: "🟣 __Rôleplay__",
                value: "**" + prefixCmd + "hug [@user] :** Câlin général !"
                    + "\n**" + prefixCmd + "punch [@user] :** Quel vilain celui-là !!!"
                    + "\n**" + prefixCmd + "hat [@user] :** Tu as fait tomber ton chapeau."
                    + "\n**" + prefixCmd + "lss [@user] :** Gloire au Leader Suprême !!"
                    + "\n**" + prefixCmd + "gratz [@user] :** Bravo !!"
                    + "\n**" + prefixCmd + "faute [message] :** Qu'est ce qu'ils m'énervent ceux-là !!",
                inline: false
            },
            {
                name: "🟣 __Choupiz__",
                value: "**" + prefixCmd + "hello :** Règle n°1 : toujours être gentil avec les choupiz !"
                    + "\n**" + prefixCmd + "choupiz @user :** eh oui les choupiz !!"
                    + "\n**" + prefixCmd + "culture [auteur] :** Parole des plus célèbres choupiz."
                    + "\n**" + prefixCmd + "stat [message] :** Calcule tes chances de succès !! (certifié Choupiz)",
                inline: false
            },
        ]));
    pages.push(new Discord.EmbedBuilder()
        .setTitle("**Liste des commandes**")
        .setColor(0x32bbff)
        .setTimestamp(Date.now())
        .setDescription("*Les surprises*")
        .setFooter({
            iconURL: message.author.displayAvatarURL(),
            text: "Demandé par " + message.author.tag
        })
        .addFields([
            {
                name: "🔵 __Invocations__",
                value: "**" + prefixCmd + "mission :** *Target down...*"
                    + "\n**" + prefixCmd + "husbando [nom] :** Les meilleurs !!"
                    + "\n**" + prefixCmd + "efx :** Obtiens un Alper aléatoire !!!"
                    + "\n**" + prefixCmd + "fusee :** Qu'est ce que c'est que ce truc là aussi ?"
                    + "\n**" + prefixCmd + "bunny :** *misete ageru, BUNNY NO CHIKARA !*"
                    + "\n**" + prefixCmd + "cero :** *Destruction.*"
                    + "\n**" + prefixCmd + "gif [recherche] :** *Recherche un gif !!*"
                    + "\n**" + prefixCmd + "react [reaction] :** *Fais moi réagir !!*",
                inline: false
            },
        ]));

    let page = 0;
    row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('buttonGoLeft')
            .setLabel('◀')
            .setStyle(ButtonStyle.Success)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('buttonGoRight')
            .setLabel('▶')
            .setStyle(ButtonStyle.Success)
            .setDisabled(pages.length < 2),
    );

    let data = {
        embeds: [pages[page]],
        components: [row],
        fetchReply: true
    }

    const msg = message.replied ? await message.followUp(data) : await message.reply(data);

    const col = msg.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter: i => i.user.id === message.author.id,
        time: 300000
    });

    col.on('collect', (i) => {
        if (i.customId === "buttonGoLeft") {
            page--;
        }
        else if (i.customId === "buttonGoRight") {
            page++;
        }
        else {
            return col.stop();
        }

        row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('buttonGoLeft')
                .setLabel('◀')
                .setStyle(ButtonStyle.Success)
                .setDisabled(page === 0),
            new ButtonBuilder()
                .setCustomId('buttonGoRight')
                .setLabel('▶')
                .setStyle(ButtonStyle.Success)
                .setDisabled(pages.length <= page + 1),
        );

        i.update({
            components: [row],
            embeds: [pages[page]]
        })
    });

    col.on('end', () => {
        msg.edit({
            components: []
        })
    });
}