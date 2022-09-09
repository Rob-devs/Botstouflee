module.exports = (message) => {
    const quotes = require("../utils/quotes.js");

    const keys = Object.keys(quotes);
    let random = Math.floor(Math.random() * keys.length);

    message.channel.send("*\"" + keys[random] + "\"*" + "\n\n**" + quotes[keys[random]] + "**");
}