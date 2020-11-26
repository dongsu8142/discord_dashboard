const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PlayCommand extends BaseCommand {
  constructor() {
    super('play', 'music', []);
  }

  async run(client, message, args) {
    const song = args.join(" ")
    await client.player.play(message, song, message.member.user);
  }
}