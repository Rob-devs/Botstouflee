//Envoi d'un gif et d'un message
module.exports = (message) => {
    message.reply({
        content: "***COMPLETE***",
        files: ['./images/missioncomplete.gif', './audio/missioncomplete.mp3']
    });
}