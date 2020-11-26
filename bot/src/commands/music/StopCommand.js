const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class StopCommand extends BaseCommand {
  constructor() {
    super('stop', 'music', []);
  }

  async run(client, message, args) {
    if (client.player.isPlaying(message)) {
      await await client.player.stop(message);
      message.channel.send("음악을 중지합니다.");
    } else {
      message.channel.send("음악이 재생 중이지 않습니다.");
    }
  }
}