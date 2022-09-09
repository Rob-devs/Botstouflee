module.exports = (message) => {

    let txt = message.content.replace(/[\W_]+/g, " ").trim().toLowerCase();

    if (txt.endsWith("quoi")) {
        message.react('🇫');
        message.react('🇪');
        message.react('🇺');
        message.react('🇷');
    }
}