const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class ServerinfoCommand extends BaseCommand {
  constructor() {
    super('서버정보', 'info', ['serverinfo', 'guildinfo', '길드정보']);
  }

  run(client, message, args) {
    const { guild } = message

    const embed = new MessageEmbed()
      .setDescription(`${guild.name}의 정보`)
      .setColor(message.guild.me.displayHexColor || 'BLUE')
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addField('일반', [
        `**❯ 이름:** ${guild.name}`,
        `**❯ 아이디:** ${guild.id}`,
        `**❯ 소유자:** ${guild.owner.user.tag}`,
        `**❯ 위치:** ${guild.region}`,
        `**❯ 부스트 티어:** ${guild.premiumTier ? `${guild.premiumTier}티어` : `없습니다.`}`,
        `**❯ 보안 레벨:** ${guild.verificationLevel}`,
        `**❯ 생성일:** ${new Date(guild.createdTimestamp).toLocaleString()}`
      ])
    message.channel.send(embed);
  }
}