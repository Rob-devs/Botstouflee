const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js");
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
const Canvas = require('@napi-rs/canvas');

client.on("ready", () => {
    //Message de status
    client.user.setActivity(prefixCmd + 'help');
    console.log("Bot ready");
});

client.on("messageCreate", async message => {
    //Si le message n'est pas une commande ou vient d'un bot, pas de traitement
    if (!message.content.startsWith(prefixCmd) || message.author.bot) return

    //Récupération des paramètres envoyés
    const args = message.content.slice(prefixCmd.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    //Commandes
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
                },
                {
                    name: prefixCmd + "hug @user",
                    value: "Anything for family",
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
        var dict = {
            "L'obsidienne possède de puissantes propriétés nettoyantes et peut éliminer l'énergie négative de vous-même et de votre environnement. Cela lui permet également de neutraliser les vibrations perturbatrices. L'obsidienne supprime les blocages, les peurs et les pensées qui se limitent. Comme de fortes émotions peuvent survenir lors de la libération, la pierre n'est pas destinée aux personnes très sensibles. Avec ses propriétés nettoyantes en profondeur, il est important de nettoyer régulièrement la pierre (de préférence après chaque utilisation). Enracinant, nettoyant en profondeur, détoxifiant, illumine l'esprit.": "Wikipedia",
            "Va voir à l'ehpad, le sexe est sale quand la toilette est mal faite ... c'est à dire tous les jours": "Xoxtin",
            "Moins que le rat, le zebre fait concensus plus facilement": "Xoxtin",
            "elle a le palais détruit, go l'amener rue d'arshot elle est plus bonne qu'a avaler des bites": "Xoxtin",
            "VIVE LA CLEAVE": "Tout le monde",
            "Tu prends alots et bbk et boom boom": "Darksoul",
            "T1: alots 314, T2: ran 315": "Hans",
            "J'ai besoin d'amour et comme j'ai pas de meuf sg me donne des ml pour me consoler": "Daarky",
            "Sg bande de sombre p*te si vous me donnez pas des ml 5 je vais venir toquer a votre porte er vous brisé les genoux bande de catin de mes deux": "Daarky",
            "Crois en la cleave et la cleave te le rendra": "Daarky",
            "Toute la famille de sg va finir au goulag en 1v1 contre moi\nJe vais les exterminer c petite salope": "Daarky",
            "Utilisation simple et sans bavure de la méthode": "Soow",
            "Elle avait un cul qui ne se refuse pas": "EFX",
            "je lui explose son fion jusqu'à ce qu'elle soit incontinente et elle en tombera amoureuse de moi": "EFX",
            "Bruh je t'assure que si je pouvais l'avoir à portée de chibre elle marcherait en canard avec un air hagard": "EFX",
            "VIVE LA SPEED": "Bistouflee",
            "c'était fort sur les perso comme carrot/atywin & co où t'avais vraiment envie que ces persos soient dans le mal vu que les compos étaient très différentes, là normalement une hwa c'est ce qu'on peut appeler \"une ancre\" qui te permet de te reposer dessus si jamais tu veux pivoter sur plusieurs styles de jeu (Aria, Aravi et accessoirement Sylvian sont des ancres). C'est juste là pour te rappeler que tu peux pas stall, et que tu dois draft pour counter cette ancre particulière, et si tu le fais, bah le mec en face pivote pour te counter tes picks si possible (vu que tous le monde à pas tous les persos de gear).": "Fhulgrim",
            "Tout arrive plus vite à qui court après": "Punch",
            "Tu perds pas car il meilleur que toi mais car t'es un 1head , même si tu chill contre du top200 là t'aurais perdu car c'est juste ton cerveau le problème": "Punch",
            "Il faut bien sympathiser avec le diable quand on combat les flammes": "Monstur",
            "ah non moi j'ai autant de charisme que ervalen": "Celaloose",
        };
        const keys = Object.keys(dict);
        let random = Math.floor(Math.random() * keys.length);

        message.channel.send("*\"" + keys[random] + "\"*" + "\n\n**" + dict[keys[random]] + "**");
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
    else if (command === "hug") {
        if (args.length < 1 || !(/<@.*>/.test(args[0]))) {
            message.react('🟥');
            message.channel.send("Commande invalide");
            return;
        }

        let userID = args.shift();
        userID = userID.substring(2, userID.length - 1);

        const canvas = Canvas.createCanvas(500, 500);
        const context = canvas.getContext('2d');

        const avatar = await Canvas.loadImage(client.users.cache.find(user => user.id === userID).displayAvatarURL());
        context.drawImage(avatar, 100, 0, 500, 500);

        const background = await Canvas.loadImage('./images/hug.png');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
        message.channel.send({ files: [attachment] });
    }
});


client.login(process.env.BOT_TOKEN);