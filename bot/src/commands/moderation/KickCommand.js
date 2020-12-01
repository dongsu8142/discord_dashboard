const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  run(client, message, args) {
    const { member, mentions } = message

    if (member.hasPermission('KICK_MEMBERS')) {
      const target = mentions.users.first();
      if (target) {
        const member = message.guild.members.cache.get(target.id);
        member.kick();
        message.channel.send(`${member.user.username}을 추방하였습니다.`);
      } else {
        message.channel.send("대상이 지정되지 않았습니다.");
      }
    } else {
      message.channel.send("권한이 충분하지 않습니다.");
    }
  }
}