const BaseCommand = require('../../utils/structures/BaseCommand');
const Levels = require('discord-xp');

module.exports = class LeaderboardCommand extends BaseCommand {
  constructor() {
    super('leaderboard', 'level', []);
  }

  async run(client, message, args) {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
    if(rawLeaderboard.length < 1) return message.reply("아직 리더보드 안에 아무도 없습니다.");

    const leaderboard = Levels.computeLeaderboard(client, rawLeaderboard);

    const lb = (await leaderboard).map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
    message.channel.send(`${lb.join("\n")}`);
  }
}