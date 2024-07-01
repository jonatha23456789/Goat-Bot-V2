const axios = require("axios");

module.exports = {
  config: {
    name: "chatbot",
    version: "1.0",
    author: "Samuel",
    countDown: 5,
    role: 0,
    shortDescription: "Chatbot en français",
    longDescription: "Discutez avec le chatbot en français.",
    category: "funny",
    guide: "{pn} [on | off]: activez/désactivez le chatbot\n} <phrase>: discutez avec le chatbot",
  },

  langs: {
    fr: {
      turnedOn: "Le chatbot est activé !",
      turnedOff: "Le chatbot est désactivé !",
      chatting: "Je discute déjà avec le chatbot... :)",
      error: "Le chatbot est occupé, veuillez réessayer plus tard.",
    },
  },

  onStart: async function ({ args, threadsData, message, event, getLang }) {
    if (args[0] === "on" || args[0] === "off") {
      await threadsData.set(event.threadID, args[0] === "on", "settings.chatbot");
      return message.reply(args[0] === "on" ? getLang("turnedOn") : getLang("turnedOff"));
    } else if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getChatbotResponse(yourMessage, "fr");
        return message.reply(`${responseMessage}`);
      } catch (err) {
        console.error(err);
        return message.reply(getLang("error"));
      }
    }
  },

  onChat: async function ({ args, message, threadsData, event, isUserCallCommand, getLang }) {
    if (args.length > 1 && !isUserCallCommand && (await threadsData.get(event.threadID, "settings.chatbot"))) {
      try {
        const responseMessage = await getChatbotResponse(args.join(" "), "fr");
        return message.reply(`${responseMessage}`);
      } catch (err) {
        return message.reply(getLang("error"));
      }
    }
  },
};

async function getChatbotResponse(yourMessage, langCode) {
  const res = await axios.post(
    "https://api.simsimi.vn/v1/simtalk",
    new URLSearchParams({
      text: yourMessage,
      lc: langCode,
    })
  );

  if (res.status >= 200 && res.status < 300) {
    return res.data.message;
  } else {
    throw new Error(res.data.success);
  }
    }
