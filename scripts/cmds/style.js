const axios = require('axios');

const styleMap = {
  "Circled": "Circled",
  "Circled (neg)": "Circled (neg)",
  "Fullwidth": "Fullwidth",
  "Math bold": "Math bold",
  "Math bold Fraktur": "Math bold Fraktur",
  "Math bold italic": "Math bold italic",
  "Math bold script": "Math bold script",
  "Math double-struck": "Math double-struck",
  "Math monospace": "Math monospace",
  "Math sans": "Math sans",
  "Math sans bold": "Math sans bold",
  "Math sans bold italic": "Math sans bold italic",
  "Math sans italic": "Math sans italic",
  "Parenthesized": "Parenthesized",
  "Regional Indicator": "Regional Indicator",
  "Squared": "Squared",
  "Squared (neg)": "Squared (neg)",
  "Tag": "Tag",
  "A-cute": "A-cute",
  "CJK+Thai": "CJK+Thai",
  "Curvy 1": "Curvy 1",
  "Curvy 2": "Curvy 2",
  "Curvy 3": "Curvy 3",
  "Faux Cyrillic": "Faux Cyrillic",
  "Faux Ethiopic": "Faux Ethiopic",
  "Math Fraktur": "Math Fraktur",
  "Rock Dots": "Rock Dots",
  "Small Caps": "Small Caps",
  "Stroked": "Stroked",
  "Subscript": "Subscript",
  "Superscript": "Superscript",
  "Inverted": "Inverted",
  "Inverted Reversed": "Inverted Reversed",
  "Reversed": "Reversed",
  "Reversed Reversed": "Reversed Reversed"
};

module.exports = {
  config: {
    name: "style",
    version: "1.0",
    author: "Samir Œ",
    shortDescription: "Style text",
    longDescription: "Style text with various fonts and characters.",
    category: "Utility",
    guide: {
      en: `{pn} [text | style number 
{
  "1": "Ⓗⓘ",
  "2": "🅗🅘",
  "3": "Ｈｉ",
  "4": "𝐇𝐢",
  "5": "𝕳𝖎",
  "6": "𝑯𝒊",
  "7": "𝓗𝓲",
  "8": "ℍ𝕚",
  "9": "𝙷𝚒",
  "10": "𝖧𝗂",
  "11": "𝗛𝗶",
  "12": "𝙃𝙞",
  "13": "𝘏𝘪",
  "14": "⒣⒤",
  "15": "🇭🇮",
  "16": "🄷🄸",
  "17": "🅷🅸",
  "18": "",
  "19": "Hí",
  "20": "んﾉ",
  "21": "ɦٱ",
  "22": "нι",
  "23": "ђเ",
  "24": "Ні",
  "25": "ዘጎ",
  "26": "ℌ𝔦",
  "27": "Ḧï",
  "28": "ʜɪ",
  "29": "Ħɨ",
  "30": "ₕᵢ",
  "31": "ᴴⁱ",
  "32": "ɥı",
  "34": "ıɥ",
  "35": "Hi",
  "36": "iH"
}`
    }
  },

  onStart: async function ({ message, args }) {
    try {
      const [text, styleIndex] = args.join(" ").split("|").map(item => item.trim());
      const styleName = Object.values(styleMap)[parseInt(styleIndex) - 1];

      if (!styleName || !text) {
        message.reply("Please provide valid text and style number.");
        return;
      }

      const response = await axios.get(`https://apis-samir.onrender.com/api/stylize?text=${encodeURIComponent(text)}`);
      
      if (!response.data[styleName]) {
        message.reply("Style not found.");
        return;
      }

      message.reply(response.data[styleName]);
    } catch (error) {
      console.error("Error styling text:", error.message);
      message.reply("Failed to style text.");
    }
  }
};
