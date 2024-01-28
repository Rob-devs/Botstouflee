const Canvas = require("@napi-rs/canvas");

module.exports = async (user) => {
  return await Canvas.loadImage(
    user.displayAvatarURL({ format: "png", size: 1024 })
  );
};
