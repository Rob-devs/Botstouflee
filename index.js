const { Client, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

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
