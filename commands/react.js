module.exports = (interaction) => {
  let reactions = [
    "pic_armscrossed.png",
    "pic_sad.png",
    "pic_hello.png",
    "pic_paquet.png",
    "pic_phone.png",
    "pic_soldier.png",
    "gif_driving.gif",
    "gif_duck.gif",
    "gif_gamble.gif",
    "gif_tasty.gif",
  ];

  let randomReaction = reactions[Math.floor(Math.random() * reactions.length)];

  interaction.reply({
    files: ["./images/" + randomReaction],
  });
};
