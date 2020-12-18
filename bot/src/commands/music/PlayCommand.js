const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('재생', 'music', ['play']);
  }

  async run(client, message, args) {
    const { channel } = message.member.voice;
    if (channel) {
      const song = args.join(" ");
      await client.player.play(message, song)
    } else {
      message.channel.send('음성 채널에 연결되어 있지 않습니다!');
    }
  }
}