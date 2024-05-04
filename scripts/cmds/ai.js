const axios = require('axios');

const Prefixes = [
  'yin',
  'chanelle',
  'shu',
  'terizla',
  'dominre',
  'ai',
  'ask',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("⛷𝙅e 𝒗𝒐𝒖𝒔 𝒑𝒓𝒊𝒆 ძe me ⍴résen𝗍er 𝒍𝒂 𝒒𝒖𝒆𝒔𝒕𝒊𝒐𝒏 𝙨𝙚𝙡𝙤𝙣 𝙫𝙤𝙩𝙧𝙚 préférence⚜, 𝙚𝙩 𝙟𝙚 𝙢'𝙚𝙢𝙥𝙡𝙤𝙞𝙚𝙧𝙖𝙞 à 𝕧𝕠𝕦𝕤 𝕠𝕗𝕗𝕣𝕚𝕣 𝕦𝕟𝕖 réponse 𝕡𝕖𝕣𝕥𝕚𝕟𝕖𝕟𝕥𝕖 𝕖𝕥 adéquate.❤ 𝐒𝐚𝐜𝐡𝐞𝐳 𝐪𝐮𝐞 𝐯𝐨𝐭𝐫𝐞 𝐬𝐚𝐭𝐢𝐬𝐟𝐚𝐜𝐭𝐢𝐨𝐧 𝐝𝐞𝐦𝐞𝐮𝐫𝐞 𝐦𝐚 𝐩𝐫𝐢𝐨𝐫𝐢𝐭é à 𝐭𝐨𝐮𝐭𝐞𝐬 é𝐠𝐚𝐫𝐝𝐬😉.(merci pour votre attention)");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({body: `
🖤🔹┃⚜️𝗧𝗲𝗿𝗶𝘇𝗹𝗮💕
▬▭▬▬▭▬▭▬▬▭
______________________
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓        
${answer}
↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
______________________
𝐁𝐲 𝐃𝐨𝐦𝐢𝐧𝐫𝐞`𝐜𝐨𝐦🍻
▬▭▬▬▭▬▭▬▬▭`,});

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
