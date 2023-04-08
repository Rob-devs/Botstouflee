const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

//Préfixe des commandes
const prefixCmd = '!';

//Lorsque le bot est prêt
client.on('ready', () => {
  //Message de status
  client.user.setActivity(prefixCmd + 'help');
  console.log('Bot ready');
});

//Lorsqu'un message est envoyé
client.on('messageCreate', (message) => {
  //Si le message vient d'un bot, on ne traite pas
  if (message.author.bot) return;

  //Si c'est un rapport Epic Report
  if (message.content.startsWith('[Epic Report]')) {
    require('./commands/epicreport.js')(message);
    return;
  }

  //Test du suffixe
  if (!message.content.startsWith(prefixCmd)) {
    require('./commands/suffix.js')(message);
    return;
  }

  //Récupération des paramètres envoyés
  const args = message.content.slice(prefixCmd.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  //Commandes
  switch (command) {
    case 'choupiz':
      require('./commands/choupiz.js')(message, args, client);
      break;
    case 'mission':
      require('./commands/mission.js')(message);
      break;
    case 'husbando':
      require('./commands/husbando.js')(message, args);
      break;
    case 'react':
      require('./commands/react.js')(message, args);
      break;
    case 'help':
      require('./commands/help.js')(message, prefixCmd);
      break;
    case 'g':
    case 's':
      require('./commands/move.js')(message, command, args, client);
      break;
    case 'fusee':
      require('./commands/fusee.js')(message);
      break;
    case 'hello':
      require('./commands/hello.js')(message);
      break;
    case 'culture':
      require('./commands/culture.js')(message, args);
      break;
    case 'efx':
      require('./commands/efx.js')(message);
      break;
    case 'bunny':
      require('./commands/bunny.js')(message);
      break;
    case 'cero':
      require('./commands/cero.js')(message);
      break;
    case 'quoi':
      require('./commands/quoi.js')(message);
      break;
    case 'hug':
      require('./commands/hug.js')(message);
      break;
    case 'punch':
      require('./commands/punch.js')(message);
      break;
    case 'hat':
      require('./commands/hat.js')(message);
      break;
    case 'resistance':
    case 'baleinodon':
    case 'lss':
      require('./commands/lss.js')(message, command);
      break;
    case 'gratz':
      require('./commands/gratz.js')(message, client);
      break;
    case 'faute':
      require('./commands/faute.js')(message, args);
      break;
    case 'stat':
      require('./commands/stat.js')(message, args, client);
      break;
    case 'c':
      require('./commands/cleverbot.js')(message, args);
      break;
    case 'info':
      require('./commands/info.js')(message);
      break;
    case 'gif':
      require('./commands/gif.js')(message, args);
      break;
    case 'uraken':
      require('./commands/uraken.js')(message);
      break;
    default:
      break;
  }
});

//Lorsqu'un message est supprimé
client.on('messageDelete', (message) => {
  if (message.author.id == require("./utils/botID.js")) {
    require('./commands/censure.js')(message);
  }
});

client.login(process.env.BOT_TEST_TOKEN);

