const axios = require('axios');

module.exports = {
    config: {
        name: "emoji",
        version: "1.0",
        author: "AceGun",
        countDown: 0,
        role: 0,
        shortDescription: "Mix two emojis",
        longDescription: "Mix two emojis provided by the user using a specified API.",
        category: "fun",
        guide: "{pn} emoji <emoji1> <emoji2>"
    },

    onStart: async function ({ api, event, args }) {
        const emoji1 = args[0];
        const emoji2 = args[1];

        if (!emoji1 || !emoji2) {
            api.sendMessage("😏 | Please provide two valid emojis.", event.threadID, event.messageID);
            return;
        }

        api.sendMessage("⏳ | Mixing emojis, please wait...", event.threadID, event.messageID);

        try {
            const response = await axios.get(`https://www.api.vyturex.com/emoji?emoji1=${encodeURIComponent(emoji1)}&emoji2=${encodeURIComponent(emoji2)}`);
            console.log("API Response:", response.data);

            if (response.data && response.data.mixedImg) {
                const imageUrl = response.data.mixedImg;

                // Use global.utils.getStreamFromURL to get the image stream
                const imageStream = await global.utils.getStreamFromURL(imageUrl);

                if (imageStream) {
                    api.sendMessage({
                        attachment: imageStream
                    }, event.threadID, event.messageID);
                } else {
                    throw new Error("Failed to retrieve image from the URL");
                }
            } else {
                throw new Error("Invalid response format or missing mixedImg in the response");
            }
        } catch (error) {
            console.error("Error mixing emojis:", error);
            api.sendMessage(`🥴 | Error mixing emojis. Please try again later.`, event.threadID, event.messageID);
        }
    }
};