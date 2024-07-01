const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get(
    "https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json",
  );
  return base.data.api;
};

module.exports = {
 config: {

  name: "fbcover",
  version: "6.9",
  role: 0,
  author: "Dipto",
  longDescription: { en: "Facebook cover"},
  category: "image",
  countDown: 5,
},

onStart: async function ({ api, event, args, usersData }) {

  const dipto = args.join(" ");
  let id;
  if (event.type === "message_reply") {
    id = event.messageReply.senderID;
  } else {
    id = Object.keys(event.mentions)[0] || event.senderID;
  }

  const nam = await usersData.get(id);

  if (!dipto) {
    return api.sendMessage(
      `❌| wrong \ntry ${global.GoatBot.config.prefix}fbcover v1/v2/v3 - name - title - address - email - phone - color (default = white)`,
      event.threadID,
      event.messageID,
    );
  } else {
    const msg = dipto.split("-");
    const v = msg[0]?.trim() || "v1";
    const name = msg[1]?.trim() || " ";
    const subname = msg[2]?.trim() || " ";
    const address = msg[3]?.trim() || " ";
    const email = msg[4]?.trim() || " ";
    const phone = msg[5]?.trim() || " ";
    const color = msg[6]?.trim() || "white";

    api.sendMessage(
      `✨ | Processing your cover, please wait...`,
      event.threadID,
      (err, info) =>
        setTimeout(() => {
          api.unsendMessage(info.messageID);
        }, 4000),
    );

    const img = `${await baseApiUrl()}/cover/${v}?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&number=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&colour=${encodeURIComponent(color)}&uid=${id}`;

    try {
      const response = await axios.get(img, { responseType: "stream" });
      const attachment = response.data;
      api.sendMessage(
        {
          body: `𝗙𝗜𝗥𝗦𝗧 𝗡𝗔𝗠𝗘: ${name}\n𝗦𝗘𝗖𝗢𝗡𝗗 𝗡𝗔𝗠𝗘:${subname}\n𝗔𝗗𝗗𝗥𝗘𝗦𝗦: ${address}\n𝗠𝗔𝗜𝗟: ${email}\n𝗣𝗛𝗢𝗡𝗘 𝗡𝗢.: ${phone}\n𝗖𝗢𝗟𝗢𝗥: ${color}\n𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘: ${nam.name}\n𝗩𝗲𝗿𝘀𝗶𝗼𝗻 : ${v}`,
          attachment,
        },
        event.threadID,
        event.messageID,
      );
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "An error occurred while generating the FB cover.",
        event.threadID,
      );
    }
}
}
};
