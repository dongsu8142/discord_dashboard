const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('밴', 'moderation', ['ban']);
  }

  run(client, message, args) {
    const { member, mentions } = message

    if (member.hasPermission('BAN_MEMBERS')) {
      const target = mentions.users.first();
      if (target) {
        const member = message.guild.members.cache.get(target.id);
        member.ban();
        message.channel.send(`${member.user.username}을 벤하였습니다.`);
      } else {
        message.channel.send("대상이 지정되지 않았습니다.");
      }
    } else {
      message.channel.send("권한이 충분하지 않습니다.");
    }
  }
}