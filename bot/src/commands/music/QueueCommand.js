const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends BaseCommand {
  constructor() {
    super('queue', 'music', []);
  }

  async run(client, message, args) {
    const player = await client.player;
    if (player.isPlaying(message)) {
      const queue = await player.getQueue(message).tracks;
      let currentPage = 0;
      const embeds = generateQueueEmbed(queue);
      const queueEmbed = await message.channel.send(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
      await queueEmbed.react('⬅️');
      await queueEmbed.react('➡️');
      await queueEmbed.react('❌');

      const filter = (reaction, user) => {
        return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
      }
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on('collect', async (reaction, user) => {
        if (reaction.emoji.name === '➡️') {
          if (currentPage < embeds.length-1) {
            currentPage++;
            queueEmbed.reactions.resolve('➡️').users.remove(message.author.id);
            queueEmbed.edit(`Current Page: ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
          } 
        } else if (reaction.emoji.name === '⬅️') {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.reactions.resolve('⬅️').users.remove(message.author.id);
            queueEmbed.edit(`Current Page ${currentPage+1}/${embeds.length}`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          queueEmbed.reactions.resolve('❌').users.remove(message.author.id);
        }
      });
    }
  }
}

function generateQueueEmbed(queue) {
  const embeds = [];
  let k = 10;
  for(let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map(track => `${++j}) [${track.title}](${track.url})`).join('\n');
    const embed = new MessageEmbed()
      .setDescription(`**[Current Song: ${queue[0].title}](${queue[0].url})**\n${info}`);
    embeds.push(embed);
  }
  return embeds;
}