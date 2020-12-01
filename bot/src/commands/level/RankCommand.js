const BaseCommand = require('../../utils/structures/BaseCommand');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const {MessageAttachment} = require('discord.js');
const { setLevel } = require('discord-xp');

module.exports = class RankCommand extends BaseCommand {
  constructor() {
    super('rank', 'level', []);
  }

  async run(client, message, args) {
    const { mentions } = message
    let target;
    if (mentions.users.first()) {
      target = mentions.users.first();
    } else {
      target = message.author;
    }
    const user = await Levels.fetch(target.id, message.guild.id);
    const neededXp = Levels.xpFor(parseInt(user.level) + 1);
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 999999);
    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
    const rank = leaderboard.find(lb => lb.userID === target.id);

    const card = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({dynamic: false, format: 'png'}))
      .setCurrentXP(user.xp)
      .setLevel(user.level)
      .setRank(rank.position)
      .setRequiredXP(neededXp)
      .setStatus(target.presence.status)
      .setProgressBar('#FFA500', "COLOR")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator);
    card.build()
      .then(data => {
        const attatchment = new MessageAttachment(data, 'funny.png')
        message.channel.send(attatchment)
      })
      .catch((err) => console.log(err));
  }
}