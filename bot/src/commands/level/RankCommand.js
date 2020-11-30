const BaseCommand = require('../../utils/structures/BaseCommand');
const Levels = require('discord-xp');
const canvacord = require('canvacord');
const {MessageAttachment} = require('discord.js');

module.exports = class RankCommand extends BaseCommand {
  constructor() {
    super('rank', 'level', []);
  }

  async run(client, message, args) {
    const target = message.author;
    const user = await Levels.fetch(target.id, message.guild.id);
    const neededXp = Levels.xpFor(parseInt(user.level) + 1);

    const rank = new canvacord.Rank()
      .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
      .setCurrentXP(user.xp)
      .setLevel(user.level)
      .setRequiredXP(neededXp)
      .setStatus(message.member.presence.status)
      .setProgressBar('#FFA500', "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator);
    rank.build()
      .then(data => {
        const attatchment = new MessageAttachment(data, 'funny.png')
        message.channel.send(attatchment)
      })
      .catch((err) => console.log(err));
  }
}