const Discord = require('discord.js');

//Donne des informations sur un utilisateur
module.exports = (message) => {

    let member = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);

    message.reply({
        embeds: [new Discord.EmbedBuilder()
            .setAuthor({ name: member.displayName.toString() })
            .setDescription('`' + member.user.username + '#' + member.user.discriminator + '`')
            .setColor(0xff96fb)
            .setThumbnail(member.user.displayAvatarURL())
            .addFields([
                { name: "UserID", value: '`' + member.user.id + '`', inline: false },
                { name: "Modérateur", value: member.kickable ? '🔴' : '🟢', inline: true },
                { name: "Bot", value: member.user.bot ? '🟢' : '🔴', inline: true },
                {
                    name: "Roles",
                    value: member.roles.cache
                        .filter((role) => role.id !== message.guild.id)
                        .map(role => role).join(', '),
                    inline: false
                },
                {
                    name: "A rejoint le serveur le",
                    value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`,
                    inline: false
                },
            ])]
    });

}