const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShuffleCommand extends BaseCommand {
  constructor() {
    super('셔플', 'music', ['shuffle']);
  }

  async run(client, message, args) {
    if (client.player.isPlaying(message)) {
      await client.player.shuffle(message);
      message.channel.send("대기열을 섞습니다.");
    } else {
      message.channel.send("음악이 재생 중이지 않습니다.");
    }
  }
}