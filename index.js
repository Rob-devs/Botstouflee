<<<<<<< HEAD
const { Client, GatewayIntentBits, Permissions } = require("discord.js");
=======
const { Client, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
>>>>>>> 690091804ca54c97445cc93a666f5e232afdad1b
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

<<<<<<< HEAD
//Préfixe des commandes
const prefixCmd = "!";

//Lorsque le bot est prêt
client.on("ready", () => {
  //Message de status
  client.user.setActivity(prefixCmd + "help");
  console.log("Bot ready");
});

//Lorsqu'un message est envoyé
client.on("messageCreate", (message) => {
  //Si le message vient d'un bot, on ne traite pas
  if (message.author.bot) return;

  //Si c'est un rapport Epic Report
  if (message.content.startsWith("[Epic Report]")) {
    require("./commands/epicreport.js")(message);
    return;
  }

  //Test du suffixe
  if (!message.content.startsWith(prefixCmd)) {
    return;
  }

  //Récupération des paramètres envoyés
  const args = message.content.slice(prefixCmd.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  //Commandes
  switch (command) {
    case "choupiz":
      if (message.channel.permissionsFor(client.user).has("ADD_REACTIONS")) {
        require("./commands/choupiz.js")(message, args, client);
      }
      break;
    case "mission":
      require("./commands/mission.js")(message);
      break;
    case "husbando":
    case "h":
      require("./commands/husbando.js")(message, args);
      break;
    case "react":
      require("./commands/react.js")(message, args);
      break;
    case "help":
      require("./commands/help.js")(message, prefixCmd);
      break;
    case "g":
    case "s":
      if (message.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")) {
        require("./commands/move.js")(message, command, args, client);
      }
      break;
    case "fusee":
      require("./commands/fusee.js")(message);
      break;
    case "hello":
      require("./commands/hello.js")(message);
      break;
    case "culture":
      require("./commands/culture.js")(message, args);
      break;
    case "efx":
      require("./commands/efx.js")(message);
      break;
    case "bunny":
      require("./commands/bunny.js")(message);
      break;
    case "cero":
      require("./commands/cero.js")(message);
      break;
    case "quoi":
      require("./commands/quoi.js")(message);
      break;
    case "hug":
      require("./commands/hug.js")(message);
      break;
    case "punch":
      require("./commands/punch.js")(message);
      break;
    case "hat":
      require("./commands/hat.js")(message);
      break;
    case "resistance":
    case "baleinodon":
    case "lss":
      require("./commands/lss.js")(message, command);
      break;
    case "gratz":
      require("./commands/gratz.js")(message, client);
      break;
    case "faute":
      require("./commands/faute.js")(message, args);
      break;
    case "stat":
      require("./commands/stat.js")(message, args, client);
      break;
    case "c":
      require("./commands/cleverbot.js")(message, args);
      break;
    case "info":
      require("./commands/info.js")(message);
      break;
    case "gif":
      require("./commands/gif.js")(message, args);
      break;
    case "uraken":
      require("./commands/uraken.js")(message);
      break;
    default:
      break;
  }
});

//Lorsqu'un message est supprimé
client.on("messageDelete", (message) => {
  if (message.author.id == require("./utils/botID.js")) {
    require("./commands/censure.js")(message);
  }
});

client.login(process.env.BOT_TOKEN);
=======
const commands = [
  {
    name: "react",
    description: "React to a message",
  },
  {
    name: "move",
    description: "Move a message to another channel",
    options: [
      {
        name: "channel",
        type: 7,
        description: "Where you want to move your content",
        required: true,
      },
      {
        name: "keep",
        type: 5,
        description: "Keep original message in the channel",
        choices: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
        required: false,
      },
      {
        name: "message",
        type: 3,
        description: "Message you want to share",
        required: false,
      },
      {
        name: "image",
        type: 11,
        description: "Picture you want to share",
        required: false,
      },
    ],
  },
  {
    name: "hello",
    description: "Say hello to the chat !",
  },
  {
    name: "hug",
    description: "Hug someone !",
    options: [
      {
        name: "user",
        type: 6,
        description: "The friend you want to hug",
        required: true,
      },
    ],
  },
  {
    name: "punch",
    description: "Punch someone !",
    options: [
      {
        name: "user",
        type: 6,
        description: "Someone you want to punch",
        required: true,
      },
    ],
  },
  {
    name: "hat",
    description: "Put a hat on someone !",
    options: [
      {
        name: "user",
        type: 6,
        description: "The friend you want to put a hat on",
        required: true,
      },
    ],
  },
  {
    name: "gratz",
    description: "Congratulate someone !",
    options: [
      {
        name: "user",
        type: 6,
        description: "Someone who did well",
        required: true,
      },
    ],
  },
  {
    name: "stat",
    description: "Botstouflee will tell you your chances of success !",
    options: [
      {
        name: "message",
        type: 3,
        description: "What you want to test",
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TEST_TOKEN);

client.once("ready", async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }

  client.user.setActivity("Using /commands");
  console.log("Bot ready");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  try {
    switch (commandName) {
      case "react":
        require("./commands/react.js")(interaction);
        break;
      case "move":
        require("./commands/move.js")(interaction);
        break;
      case "hello":
        require("./commands/hello.js")(interaction);
        break;
      case "hug":
        require("./commands/hug.js")(interaction);
        break;
      case "punch":
        require("./commands/punch.js")(interaction);
        break;
      case "hat":
        require("./commands/hat.js")(interaction);
        break;
      case "gratz":
        require("./commands/gratz.js")(interaction);
        break;
      case "stat":
        require("./commands/stat.js")(interaction);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.BOT_TEST_TOKEN);
>>>>>>> 690091804ca54c97445cc93a666f5e232afdad1b
