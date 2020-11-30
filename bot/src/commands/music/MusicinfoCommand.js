const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class MusicinfoCommand extends BaseCommand {
  constructor() {
    super('음악정보', 'music', ['musicinfo', 'nowplaying']);
  }

  async run(client, message, args) {
    if (client.player.isPlaying(message)) {
      const track = await client.player.nowPlaying(message);
      message.channel.send(`${track.title} - <${track.url}> - ${track.duration}`)
    } else {
      message.channel.send("음악이 재생 중이지 않습니다.");
    }
  }
}