module.exports = (message, args, client) => {
    if (args.length < 1 || !(/<@.*>/.test(args[0]))) {
        message.react('🟥');
        message.channel.send("Commande invalide");
        return;
    }
    let userID = args.shift();
    userID = userID.substring(2, userID.length - 1);
    message.channel.send(client.users.cache.find(user => user.id === userID).username + "choupichou plus choupi des choupiz!!");
}