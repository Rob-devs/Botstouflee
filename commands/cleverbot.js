const cleverbot = require('cleverbot-free');

// Array : [[id, Date]]
var userHistory = [];

// Array : [[message, message2, message3]]
var history = [];

const checkUser = (id) => {
  var returnIndex = -1;
  var currDate = new Date().getTime();

  //  Vérifie si l'utilisateur a déjà une conversation avec le bot et qu'elle date de moins de 10 minutes
  //  Renvoie son index si il existe
  userHistory.map((value, index) => {
    if (value[0] === id) {
      // Moins de 10 minutes
      if ((currDate - value[1]) / 1000 / 60 < 10) {
        // Mets à jour son timer
        userHistory[index][1] = new Date().getTime();
        returnIndex = index;
      } else {
        // User existe mais conversation de + de 10 minutes
        // On l'enlève de l'historique
        userHistory.splice(index, 1);
        history.splice(index, 1);
      }
    }
  });

  return returnIndex;
};

//Envoi un message à cleverbot et renvoie sa réponse
module.exports = (message) => {
  var messageString = message.content.split('&c ')[1];

  var userIndex = checkUser(message.author.id);

  // Premier message avec le bot
  if (userIndex === -1) {
    cleverbot(messageString).then((response) => {
      // Création de l'user et début de conv dans l'historique
      userHistory.push([message.author.id, new Date().getTime()]);
      history.push([messageString, response]);

      message.reply(response);
    });
  }
  // Déjà en conversation avec le bot
  else {
    cleverbot(messageString, history[userIndex]).then((response) => {
      // Mets à jour l'historique de conv
      history[userIndex].push(messageString);
      history[userIndex].push(response);
      message.reply(response);
    });
  }
};
