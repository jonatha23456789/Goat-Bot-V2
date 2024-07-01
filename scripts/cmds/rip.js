const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "rip",
    version: "1.1",
    author: "Sigma",
    countDown: 5,
    role: 0,
    shortDescription: "RIP image",
    longDescription: "RIP image",
    category: "image",
    guide: {
      en: "{pn} @tag"
    }
  },

  langs: {
    vi: {
      noTag: "Bạn phải tag người bạn muốn cho vào mồ"
    },
    en: {
      noTag: "You must tag the person you want to put in the grave"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const img = await new DIG.Rip().getImage(avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid2}_Rip.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
    message.reply({
      body: `R.I.P repose en paix objet 😎🖕`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};