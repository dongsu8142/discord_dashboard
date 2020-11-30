require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client({ws: { intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_REACTIONS'] }});
const mongoose = require('mongoose');
const { Player } = require("discord-player");
const player = new Player(client);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

(async () => {
  client.player = player;
  client.player.on('trackStart', (message, track) => {
    message.channel.send(`음악을 시작합니다. ${track.title} - <${track.url}> - ${track.author} (${track.duration})`)
  })
    .on('queueEnd', (message, queue) => message.channel.send('대기열에 더 이상 음악이 없어서 음악이 중지되었습니다!'))
    .on('trackAdd', (message, track) => message.channel.send(`${track.title}가 대기열에 추가되었습니다.`))
    .on('playlistAdd', (message, playlist) => message.channel.send(`${playlist.title}가 대기열에 추가되었습니다. (${playlist.items.length}개)!`))
    .on('channelEmpty', (message, queue) => message.channel.send('음성 채널에 더 이상 멤버가 없어 음악이 중단되었습니다!'))
    .on('botDisconnect', (message, queue) => message.channel.send('채널 연결이 끊어져서 음악이 멈췄어요!'))
    .on('searchResults', (message, query, tracks) => {
      const embed = new MessageEmbed()
      .setAuthor(`Here are your search results for ${query}!`)
      .setDescription(tracks.map((t, i) => `${i + 1}. [${t.title}]()`))
      .setFooter('Send the number of the song you want to play!')
      message.channel.send(embed);
      // const embed = new MessageEmbed()
      //   .setAuthor(`Here are your search results for ${query}!`)
      //   .setFooter('Send the number of the song you want to play!');
      // tracks.map((t, i) => embed.addField(i + 1, `[${t.title}](${t.url})`, true))
      // message.channel.send(embed);
    })
    .on('error', (error, message) => {
      switch(error){
        case 'NotPlaying':
          message.channel.send('음악이 재생 중이지 않습니다.');
          break;
        case 'NotConnected':
          message.channel.send('음성 채널에 연결되어 있지 않습니다!');
          break;
        case 'UnableToJoin':
          message.channel.send('음성 채널에 참여할 수 없습니다. 권한을 확인해 주세요.');
          break;
        default:
          message.channel.send(`문제가 발생했습니다 ... 에러: ${error}`);
      }
    })
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

