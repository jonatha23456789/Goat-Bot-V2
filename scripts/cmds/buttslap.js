const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");
const mime = require('mime');

module.exports = {
    config: {
        name: "buttslap",
        aliases: ["bs"],
        version: "1.0",
        author: "AceGun",
        countDown: 5,
        role: 0,
        shortDescription: "buttslap someone",
        longDescription: "",
        category: "Entertainment",
        guide: "{pn}"
    },

    onStart: async function ({ message, event, args }) {
        try {
            const mention = Object.keys(event.mentions);
            if (mention.length === 0) {
                return message.reply("Please mention someone");
            } else {
                const one = event.senderID, two = mention[0];
                const ptth = await bal(one, two);
                message.reply({ body: "lu kha😤😤", attachment: fs.createReadStream(ptth) });
            }
        } catch (error) {
            console.error("Error during onStart:", error);
            // Handle the error accordingly
        }
    }
};

async function bal(one, two) {
    try {
        let avone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
        avone.getMIME(); // Ensure this returns a valid MIME type
        avone.circle();

        let avtwo = await jimp.read(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
        avtwo.getMIME(); // Ensure this returns a valid MIME type
        avtwo.circle();

        let pth = "butt.png";
        let img = await jimp.read("https://i.imgur.com/5UXg298.jpeg");

        img.resize(720, 405).composite(avone.resize(90, 90), 350, 34).composite(avtwo.resize(90, 90), 180, 185);

        await img.writeAsync(pth);
        return pth;
    } catch (error) {
        console.error("Error during image processing:", error);
        // Handle the error accordingly
        throw error; // Rethrow the error for the calling function to handle
    }
}