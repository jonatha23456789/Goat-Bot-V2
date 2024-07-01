 module.exports = {
  config: {
    name: "Deltagc",
    aliases: ["deltagc"],
    version: "1.0",
    author: "Jesan | fixed by mero",
    countDown: 10,
    role: 0,
    shortDescription: {
      en: "Adds user to admin support group."
    },
    longDescription: {
      en: "This command adds the user to the bot admin support group."
    },
    category: "ⱠØVɆⱠɎ",
    guide: {
      en: "{pn} :to add yourself to the admin support group"
    }
  },

  onStart: async function ({ api, args,  event }) {
    const supportGroupId = "7388508577881465"; // ID of the port group

    const threadID = event.threadID;
    const userID = event.senderID;

    // Check if the user is already in the support group
    try {
      const threadInfo = await api.getThreadInfo(supportGroupId);
      const participantIDs = threadInfo.participantIDs;
      if (participantIDs.includes(userID)) {
        // User is already in the support group
        api.sendMessage(
          "✅ 𝐓𝐮 𝐚𝐬 𝐝𝐞́𝐣𝐚̀ 𝐞́𝐭𝐞́ 𝐚𝐣𝐨𝐮𝐭𝐞𝐫 𝐝𝐚𝐧𝐬 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐬𝐢 𝐭𝐮 𝐧𝐞 𝐥𝐞 𝐭𝐫𝐨𝐮𝐯𝐞 𝐩𝐚𝐬, 𝐯𝐞́𝐫𝐢𝐟𝐢𝐞 𝐭'𝐚 𝐛𝐨𝐢𝐭𝐞 𝐝'𝐢𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐩𝐚𝐬 𝐦𝐬𝐠 𝐨𝐮 𝐭'𝐚 𝐛𝐨𝐢𝐭𝐞 𝐝𝐞 𝐬𝐩𝐚𝐦•",
          threadID
        );
      } else {
        // Add user to the support group
        api.addUserToGroup(userID, supportGroupId, (err) => {
          if (err) {
            console.error("❎ | Failed to add user to support group:", err);
            api.sendMessage(
              "❎ 𝐃𝐞́𝐬𝐨𝐥𝐞́, 𝐣'𝐚𝐫𝐫𝐢𝐯𝐞 𝐩𝐚𝐬 𝐚 𝐭'𝐚𝐣𝐨𝐮𝐭𝐞𝐫 𝐝𝐚𝐧𝐬 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐝𝐞 𝐦𝐨𝐧 𝐜𝐫𝐞́𝐚𝐭𝐞𝐮𝐫. 𝐂𝐞𝐥𝐚 𝐞𝐬𝐭 𝐩𝐞𝐮𝐭 𝐞̂𝐭𝐫𝐞 𝐝𝐮̂ 𝐚𝐮 𝐟𝐚𝐢𝐭 𝐪𝐮𝐞 𝐭𝐨𝐧 𝐜𝐨𝐦𝐩𝐭𝐞 𝐞𝐬𝐭 𝐝𝐞́𝐟𝐢𝐧𝐢𝐬 𝐬𝐮𝐫 𝐩𝐫𝐢𝐯𝐞́ 𝐨𝐮 𝐪𝐮𝐞 𝐭𝐮 𝐚𝐬 𝐢𝐧𝐭𝐞𝐫𝐝𝐢𝐭 𝐥𝐞𝐬 𝐢𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧𝐬 𝐩𝐚𝐬 𝐦𝐬𝐠. 𝐕𝐚𝐬 𝐝𝐚𝐧𝐬 𝐥𝐞𝐬 𝐩𝐚𝐫𝐚𝐦𝐞̀𝐭𝐫𝐞 𝐝𝐞 𝐭𝐧 𝐜𝐨𝐦𝐩𝐭𝐞 𝐩𝐨𝐮𝐫 𝐚𝐫𝐫𝐚𝐧𝐠𝐞𝐫 𝐬𝐚 𝐨𝐮 𝐭𝐮 𝐩𝐞𝐮𝐭 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐫 𝐥𝐚 𝐜𝐦𝐝 *•𝐜𝐚𝐥𝐥𝐚𝐝* 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐭𝐚𝐜𝐭𝐞𝐫 𝐦𝐨𝐧 𝐚𝐝𝐦𝐢𝐧 •",
              threadID
            );
          } else {
            api.sendMessage(
              "✅ 𝐓'𝐚 𝐞́𝐭𝐞́ 𝐚𝐣𝐨𝐮𝐭𝐞𝐫 𝐝𝐚𝐧𝐬 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐝𝐞 𝐦𝐨𝐧 𝐜𝐫𝐞́𝐚𝐭𝐞𝐮𝐫. 𝐏𝐚𝐬𝐬𝐞 𝐮𝐧 𝐛𝐧 𝐦𝐨𝐦𝐞𝐧𝐭 (✿◠‿◠), 𝐬𝐢 𝐭𝐮 𝐧'𝐚𝐫𝐫𝐢𝐯𝐞 𝐩𝐚𝐬 𝐚 𝐫𝐞𝐭𝐨𝐮𝐯𝐞𝐫 𝐥𝐞 𝐠𝐫𝐨𝐮𝐩𝐞 𝐫𝐞𝐠𝐚𝐫𝐝𝐞 𝐝𝐚𝐧𝐬 𝐭𝐞𝐬 𝐢𝐧𝐯𝐢𝐭𝐚𝐭𝐢𝐨𝐧 𝐩𝐚𝐬 𝐦𝐬𝐠 𝐨𝐮 𝐝𝐚𝐧𝐬 𝐭'𝐚 𝐛𝐨𝐢𝐭𝐞 𝐝𝐞 𝐬𝐩𝐚𝐦•",
              threadID
            );
          }
        });
      }
    } catch (e) {
      console.error("Failed to get thread info:", e);
      api.sendMessage(
        "❎ 𝐈𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞 𝐝𝐞 𝐫𝐞𝐜𝐮𝐩𝐞́𝐫𝐞𝐫 𝐥𝐞𝐬 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧 𝐬𝐮𝐫 𝐜𝐨𝐫𝐧𝐞𝐥𝐢𝐚𝐠𝐜, 𝐥'𝐈𝐃 𝐝𝐮 𝐠𝐫𝐨𝐮𝐩𝐞 𝐚 𝐩𝐞𝐮𝐭-𝐞̂𝐭𝐫𝐞 𝐞́𝐭𝐞́ 𝐦𝐨𝐝𝐢𝐟𝐢𝐞𝐫•",
        threadID
      );
    }
  }
};
