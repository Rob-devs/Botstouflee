module.exports = (message) => {
    let alper = ["./images/alper1.png",
        "./images/alper2.png",
        "./images/alper3.png",
        "./images/alper4.png"];
    let random = Math.floor(Math.random() * alper.length);

    message.channel.send({ files: [alper[random]] });
}