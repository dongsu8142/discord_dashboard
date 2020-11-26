const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SkipCommand extends BaseCommand {
  constructor() {
    super('skip', 'music', []);
  }

  async run(client, message, args) {
    if (client.player.isPlaying(message)) {
      await await client.player.skip(message);
      message.channel.send("음악을 스킵합니다.");
    } else {
      message.channel.send("음악이 재생 중이지 않습니다.");
    }
  }
}