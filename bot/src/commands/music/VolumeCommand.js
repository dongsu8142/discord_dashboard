const { Channel } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class VolumeCommand extends BaseCommand {
  constructor() {
    super('볼륨', 'music', ['volume']);
  }

  async run(client, message, args) {
    const volume = Number(args[0]);
    if (client.player.isPlaying(message)) {
      if (volume) {
        await client.player.setVolume(message, volume);
        message.channel.send(`볼륨을 ${volume}으로 설정했습니다.`)
      } else {
        const queue = await client.player.getQueue(message);
        message.channel.send(`현재 볼륨은 ${queue.volume}입니다.`)
      }
    } else {
      message.channel.send("음악이 재생 중이지 않습니다.")
    }
  }
}