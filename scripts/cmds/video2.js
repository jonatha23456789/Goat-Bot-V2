const axios = require('axios');
const fs = require('fs-extra');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const path = require('path'); // Add path module

module.exports = {
  config: {
    name: 'video2',
    version: '2.0',
    role: 0,
    author: 'ArYAN',
    cooldowns: 0,
    longDescription: {
      en: "Download video from YouTube"
    },
    category: 'media',
    guide: {
      en: '.video < name >'
    },
    dependencies: {
      'fs-extra': '',
      'axios': '',
      'ytdl-core': '',
      'yt-search': '',
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const input = event.body;
      const text = input.substring(5);
      const data = input.split(' ');

      if (data.length < 2) {
        return api.sendMessage('⛔|𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗨𝘀𝗲\n━━━━━━━━━━━━\n\nPlease provide a specify video name!', event.threadID);
      }

      data.shift();
      const musicName = data.join(' ');

      api.setMessageReaction('⏰', event.messageID, () => {}, true);

      const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        api.sendMessage('⛔|𝗡𝗼 𝗗𝗮𝘁𝗮\n━━━━━━━━━━━━\n\nNo video found........', event.threadID);
        return;
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      const stream = ytdl(musicUrl, { filter: 'videoandaudio' }); // Changed filter to 'videoandaudio'

      const fileName = `${event.senderID}.mp4`; // Changed file extension to mp4
      const filePath = path.join(__dirname, 'cache', fileName);

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        const fileSize = formatFileSize(fs.statSync(filePath).size);
        const musicDuration = music.duration.timestamp;

        const likes = music.likes !== undefined ? music.likes : 'N/A';
        const dislikes = music.dislikes !== undefined ? music.dislikes : 'N/A';
        const views = music.views !== undefined ? music.views : 'N/A';

        const message = {
          body: `🎶|𝗬𝗢𝗨𝗧𝗨𝗕𝗘\n━━━━━━━━━━━━\n\n✨ 𝗧𝗶𝘁𝗹𝗲: ${music.title}\n\n📅 𝗣𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱 𝗼𝗻: ${music.ago}\n\n👀 𝘃𝗶𝗲𝘄𝘀 : ${views}\n\n👎 𝗗𝗶𝘀𝗹𝗶𝗸𝗲𝘀: ${dislikes}\n\n👍 𝗟𝗶𝗸𝗲𝘀: ${likes}\n\n⏳ 𝗗𝘂𝗿𝗮𝘁𝗶𝗼𝗻: ${musicDuration}\n\n🖇️ 𝗙𝗶𝗹𝗲 𝗦𝗶𝘇𝗲: ${fileSize}\n\n🎵 𝗖𝗵𝗮𝗻𝗻𝗲𝗹: ${music.author.name}\n\n📎 𝗨𝗥𝗟: ${music.url}`,
          attachment: fs.createReadStream(filePath),
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
          api.setMessageReaction('✅', event.messageID, () => {}, true);
        });
      });

    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('⛔|𝗘𝗿𝗿𝗼𝗿\n━━━━━━━━━━━━\n\nSorry, an error occurred while processing the command.', event.threadID);
    }
  },

  onChat: async function ({ api, event }) {
    if (event.body && event.body.toLowerCase().startsWith('video')) {
      const musicName = event.body.substring(5).trim();
      this.onStart({ api, event });
    }
  },
};

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / 1048576).toFixed(2) + ' MB';
}
