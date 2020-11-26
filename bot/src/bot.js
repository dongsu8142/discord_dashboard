require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client({ws: { intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] }});
const mongoose = require('mongoose');
const { Player } = require("discord-player");
const player = new Player(client);

mongoose.connect('mongodb://localhost/djdashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

(async () => {
  client.player = player;
  client.player.on('trackStart', (message, track) => {
    message.channel.send(`음악을 시작합니다. [${track.title}](${track.url}) - ${track.author} (${track.duration})`)
  });
  client.player.on('queueEnd', (message, queue) => message.channel.send('대기열에 더 이상 음악이 없어서 음악이 중지되었습니다!'));
  client.player.on('trackAdd', (message, track) => message.channel.send(`${track.title}가 대기열에 추가되었습니다.`));
  client.player.on('playlistAdd', (message, playlist) => message.channel.send(`${playlist.title}가 대기열에 추가되었습니다. (${playlist.items.length}개)!`));
  client.player.on('channelEmpty', (message, queue) => message.channel.send('음성 채널에 더 이상 멤버가 없어 음악이 중단되었습니다!'));
  client.player.on('botDisconnect', (message, queue) => message.channel.send('채널 연결이 끊어져서 음악이 멈췄어요!'));
  client.player.on('searchResults', (message, query, tracks) => {
 
    const embed = new MessageEmbed()
    .setAuthor(`Here are your search results for ${query}!`)
    .setDescription(tracks.map((t, i) => `${i + 1}. ${t.title}`))
    .setFooter('Send the number of the song you want to play!')
    message.channel.send(embed);
 
})
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

