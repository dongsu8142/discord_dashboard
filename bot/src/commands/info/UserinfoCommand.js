const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } =  require('discord.js');

module.exports = class UserinfoCommand extends BaseCommand {
  constructor() {
    super('userinfo', 'info', []);
  }

  run(client, message, args) {
    const { mentions, guild } = message
    let target;
    if (mentions.users.first()) {
      target = mentions.users.first();
    } else {
      target = message.author;
    }
    const member = guild.members.cache.get(target.id)
    const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
    const embed = new MessageEmbed()
    .setTitle(target.username + nickname(member.nickname))
    .setAuthor(target.username, target.displayAvatarURL())
    .setDescription("**이름**: " + target.username + "\n**태그**: " + target.username + "#" + target.discriminator + "\n**아이디**: " + target.id)
    .addField("서버 참여 시간", new Date(member.joinedTimestamp).toLocaleString(), true)
    .addField("계정 생성 일", new Date(target.createdTimestamp).toLocaleString(), true)
    .addField("역할", `**[${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`, true)
    message.channel.send(embed)
  }
}

function nickname(name) {
  if (name == null) {
    return "";
  } else {
    return `(${name})`
  }
}