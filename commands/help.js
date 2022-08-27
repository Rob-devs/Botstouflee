const Discord = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require("discord.js");

module.exports = async (message, prefixCmd) => {

    //Generate pages
    const pages = [];
    pages.push(new Discord.EmbedBuilder()
        .setTitle("**Liste des commandes disponibles**")
        .setColor(0x8d4294)
        .setTimestamp(Date.now())
        .setDescription("*Page 1/2*")
        .setFooter({
            iconURL: message.author.displayAvatarURL(),
            text: message.author.tag
        })
        .addFields([
            {
                name: prefixCmd + "help",
                value: "`Liste des commandes disponibles`",
                inline: false
            },
            {
                name: prefixCmd + "hello",
                value: "`Règle n°1 : toujours être gentil avec les choupiz`",
                inline: false
            },
            {
                name: prefixCmd + "g #channel1 #channel2.. [message | image]",
                value: "`Copie le message ou l'image dans le channel`",
                inline: false
            },
            {
                name: prefixCmd + "s #channel1 #channel2.. [message | image]",
                value: "`Déplace le message ou l'image dans le channel`",
                inline: false
            },
            {
                name: prefixCmd + "fusee",
                value: "`Qu'est ce que c'est que ce truc là aussi ?`",
                inline: false
            },
            {
                name: prefixCmd + "mission",
                value: "`Target down...`",
                inline: false
            }
        ]));
    pages.push(new Discord.EmbedBuilder()
        .setTitle("**Liste des commandes disponibles**")
        .setColor(0x8d4294)
        .setTimestamp(Date.now())
        .setDescription("*Page 2/2*")
        .setFooter({
            iconURL: message.author.displayAvatarURL(),
            text: message.author.tag
        })
        .addFields([
            {
                name: prefixCmd + "choupiz @user",
                value: "`eh oui les choupiz !!`",
                inline: false
            },
            {
                name: prefixCmd + "culture",
                value: "`-Botstouflee, philisophe moderne`",
                inline: false
            },
            {
                name: prefixCmd + "efx",
                value: "`Obtiens un Alper aléatoire !!!`",
                inline: false
            },
            {
                name: prefixCmd + "bunny",
                value: "`misete ageru, BUNNY NO CHIKARA !`",
                inline: false
            },
            {
                name: prefixCmd + "quoi",
                value: "`Définit un nombre important de règles nécessaires`",
                inline: false
            },
            {
                name: prefixCmd + "hug [@user]",
                value: "`Anything for family`",
                inline: false
            },
            {
                name: prefixCmd + "hat [@user]",
                value: "`Tu as fait tomber ton chapeau`",
                inline: false
            }
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
        time: 50000
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