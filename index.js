const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    client.user.setActivity('!help');
    console.log("bot ok");
});

client.on("messageCreate", message => {
    if (message.author.bot) return;

    console.log(message);
    if (message.content === "bibz") {
        message.reply("le plus choupiz des choupiz");
    }
    else if (message.content.trim().toLowerCase() == "mission") {
        message.reply("COMPLETE");
        message.channel.send("https://cdn.discordapp.com/emojis/952260601198026792.gif?size=96&quality=lossless");
    }
    else if (message.content === "!help") {
        message.channel.send("[------- Commandes -------]\n`!g #channel message` : copie le message dans le channel\n`!s #channel message` : déplace le message dans le channel");
    }
    else if (message.content.startsWith("!g ")) {
        let newMessage = message.content.substring(3);
        chanID = newMessage.match(/<#.*>/);
        if (chanID == null || chanID === "") {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
            return;
        }
        chanID = chanID.toString().substring(2, chanID.length - 1);
        newMessage = newMessage.replace(/<#.*>/, '').trim();
        let newChannel = client.channels.cache.get(chanID);
        if (newChannel) {
            newChannel.send(newMessage);
            message.react('✅');
        }
        else {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
        }

    }
    else if (message.content.startsWith("!s ")) {
        let newMessage = message.content.substring(3);
        chanID = newMessage.match(/<#.*>/);
        if (chanID == null || chanID === "") {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
            return;
        }
        chanID = chanID.toString().substring(2, chanID.length - 1);
        newMessage = newMessage.replace(/<#.*>/, '').trim();
        let newChannel = client.channels.cache.get(chanID);
        if (newChannel) {
            newChannel.send(newMessage);
        }
        else {
            message.react('🟥');
            message.channel.send("Pas de channel trouvé");
        }
        message.delete();
    }
});


client.login("MTAxMDYxMTEyNjU3ODQ1MDU0Mw.GQuYKv.CxTZwvPC1TeFXkzI03RU4BEQlSDoQYMcTnpYd8")