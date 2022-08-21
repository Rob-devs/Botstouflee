const { Client, GatewayIntentBits, DiscordjsErrorMixin } = require("discord.js");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefixCmd = '&';
const Discord = require('discord.js');

client.on("ready", () => {
    //Message de status
    client.user.setActivity(prefixCmd + 'help');
    console.log("Bot ready");
});

client.on("messageCreate", message => {
    //Si le message n'est pas une commande ou vient d'un bot, pas de traitement
    if (!message.content.startsWith(prefixCmd) || message.author.bot) return

    //Récupération des paramètres envoyés
    const args = message.content.slice(prefixCmd.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "choupiz") {
        if (args.length < 1 || !(/<@.*>/.test(args[0]))) {
            message.react('🟥');
            message.channel.send("Commande invalide");
            return;
        }
        message.reply(args[0] + "choupichou plus choupi des choupiz !!");
    }
    else if (command === "mission") {
        message.reply("COMPLETE");
        message.channel.send("https://cdn.discordapp.com/emojis/952260601198026792.gif?size=96&quality=lossless");
    }
    else if (command === "help") {

        const helpMessage = new Discord.EmbedBuilder()
            .setTitle("Liste des commandes disponibles")
            .setColor(0x8d4294)
            .setTimestamp(Date.now())
            .setDescription("――――――――――――――――――――――――――――")
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .addFields([
                {
                    name: prefixCmd + "help",
                    value: "Liste des commandes disponibles",
                    inline: false
                },
                {
                    name: prefixCmd + "hello",
                    value: "Règle n°1 : toujours être gentil avec les choupiz",
                    inline: false
                },
                {
                    name: prefixCmd + "g #channel [message | image]",
                    value: "Copie le message ou l'image dans le channel",
                    inline: false
                },
                {
                    name: prefixCmd + "s #channel [message | image]",
                    value: "Déplace le message ou l'image dans le channel",
                    inline: false
                },
                {
                    name: prefixCmd + "fusee",
                    value: "Qu'est ce que c'est que ce truc là aussi ?",
                    inline: false
                },
                {
                    name: prefixCmd + "mission",
                    value: "Target down...",
                    inline: false
                },
                {
                    name: prefixCmd + "choupiz @user",
                    value: "eh oui les choupiz !!",
                    inline: false
                },
                {
                    name: prefixCmd + "culture",
                    value: "-Botstouflee, philisophe moderne",
                    inline: false
                },
                {
                    name: prefixCmd + "efx",
                    value: "Obtiens un Alper aléatoire !!!",
                    inline: false
                },
                {
                    name: prefixCmd + "bunny",
                    value: "misete ageru, BUNNY NO CHIKARA !",
                    inline: false
                },
                {
                    name: prefixCmd + "quoi",
                    value: "Définit un nombre important de règles nécessaires",
                    inline: false
                }
            ])

        message.channel.send({ embeds: [helpMessage] });
    }
    else if (command === "g" || command === "s") {

        //Image envoyé dans le message, null s'il n'y en a pas
        const image = message.attachments.first() ? message.attachments.first().url : null;

        //Test de validité de la commande
        if ((args.length < 2 || !(/<#.*>/.test(args[0]))) && (args.length < 1 || !(/<#.*>/.test(args[0])) || image === null)) {
            message.react('🟥');
            message.channel.send("Commande invalide");
            return;
        }
        //ID du channel envoyé
        let chanID = args.shift();
        chanID = chanID.substring(2, chanID.length - 1);
        let newChannel = client.channels.cache.get(chanID);

        //Construction du message
        newMessage = "";
        args.forEach(element => {
            newMessage += element + " ";
        });
        if (newMessage == "") {
            newMessage += "On m'a dit de transférer ça :"
        }

        //Envoi du message si le chan existe
        if (newChannel) {
            newChannel.send(newMessage);
            if (image != null)
                newChannel.send(image);
            if (command === "g")
                message.react('✅');
            else
                message.delete();
        }
        else {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
        }
    }
    else if (command === "fusee") {
        message.channel.send("https://tenor.com/view/morsay-%C3%A7a-cest-ma-fus%C3%A9e-tenor-gif-discord-gif-25591052");
        message.channel.send("**nous on est armés, chargés, calibrés batard**");
    }
    else if (command === "hello") {
        message.channel.send("╔═══˚✩ ⋆. ̊ \n     ✧ 𝑯𝑬𝑳𝑳𝑶 𝑪𝑯𝑨𝑻 ✧\n                       ˚✩ ⋆. ̊═══╝");
    }
    else if (command === "culture") {
        let replies = ["Le sexe entre deux personnes, c'est beau. Entre cinq personnes, c'est fantastique...",
            "La différence entre le sexe et la mort, c'est que mourir, vous pouvez le faire seul, et personne ne se moquera de vous.",
            "Une femme veut beaucoup de sexe avec l'homme qu'elle aime. Un homme veut beaucoup de sexe.",
            "Quand les anges auront un sexe j'aurai des ailes",
            "Le sexe apaise les tensions. L'amour les provoque.",
            "Le sexe n'est pas l'amour, ce n'est qu'un territoire que l'amour s'approprie.",
            "Le ramollissement du sexe durcit le coeur.",
            "Le sexe, c'est ce qu'il y a de profond entre l'homme et la femme.",
            "Est-ce que le sexe est sale ? Seulement quand il est bien fait.",
            "Le sexe est le baromètre des sentiments.",
            "L'argent peut acheter une maison, mais pas un foyer. Il peut acheter le lit, mais pas le sommeil. Il peut acheter une horloge, mais pas le temps. Il peut acheter un livre, mais pas la connaissance. Il peut acheter une position, mais pas le respect. Il peut acheter du sexe, mais pas l'amour !",
            "Le sexe est le prix que les femmes paient pour se marier. Le mariage est le prix que les hommes paient pour avoir du sexe.",
            "Le sexe masculin est ce qu'il y a de plus léger au monde, une simple pensée le soulève.",
            "Pourquoi le sexe occupe t-il tant notre esprit ? Parce qu'il est l'échappatoire suprême. C'est la voie ultime vers l'oublie de soi absolu.",
            "Il n’y a pas de sagesse au-dessous de la ceinture.",
            "TEAM BOOBA"];
        let random = Math.floor(Math.random() * replies.length);

        message.reply("*\"" + replies[random] + "\"*" + "\n\n**Botstouflee**");
    }
    else if (command === "efx") {
        let alper = ["https://cdn.discordapp.com/emojis/989603680712032326.webp?size=96&quality=lossless",
            "https://cdn.discordapp.com/emojis/989603683169869854.webp?size=96&quality=lossless",
            "https://cdn.discordapp.com/emojis/989601555156197388.webp?size=96&quality=lossless",
            "https://cdn.discordapp.com/emojis/989603685573214228.webp?size=96&quality=lossless"];
        let random = Math.floor(Math.random() * alper.length);

        message.channel.send(alper[random]);
    }
    else if (command === "bunny") {
        let bunnygif = ["https://media.giphy.com/media/noAv4Zvd3PYUKWQVT3/giphy.gif",
            "https://media.discordapp.net/attachments/788046506388750416/934525925683523604/BUNNYSTRONG.gif",
            "https://media.discordapp.net/attachments/884346691631869952/949799068169801848/SPEEDSTOUFLEE_-_Copie_Trim.gif",
            "https://media.giphy.com/media/yD8PJRaqIYG19aV3MA/giphy-downsized-large.gif",
            "https://media.giphy.com/media/vKYDl1sU3jzztdsw8a/giphy-downsized-large.gif"];
        let random = Math.floor(Math.random() * bunnygif.length);

        message.channel.send(bunnygif[random]);
    }
    else if (command === "quoi") {
        message.reply("feur");
        message.channel.send(client.user.displayAvatarURL());
    }
});


client.login(process.env.BOT_TOKEN);