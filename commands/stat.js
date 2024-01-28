module.exports = async (interaction) => {
  const random = Math.floor(Math.random() * 101);

  let message = interaction.options.getString("message");
  let newMessage = "```bash\nCalculating...```\n";

  if (message) {
    newMessage += `➤ "${message}"\n`;
  }

  newMessage += `**${random
    .toString()
    .padStart(3, " ")}%** \`${createProgressBar(random)}\`\n\n`;

  const replyOptions = {
    content: newMessage,
    files:
      random === 100
        ? ["./images/ultrabunny.png"]
        : random <= 5
        ? ["./images/pic_sad.png"]
        : [],
  };
  interaction.reply(replyOptions);
};

function createProgressBar(percentage) {
  const filledBarLength = Math.floor(percentage / 2);
  const emptyBarLength = 50 - filledBarLength;
  return "█".repeat(filledBarLength) + "-".repeat(emptyBarLength);
}
