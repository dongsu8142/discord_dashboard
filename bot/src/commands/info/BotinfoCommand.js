const BaseCommand = require('../../utils/structures/BaseCommand');
const os = require('os');
const { version } = require('../../../package.json');
const ms = require('ms');
const { MessageEmbed, version: djsversion } = require('discord.js');

module.exports = class BotinfoCommand extends BaseCommand {
  constructor() {
    super('봇정보', 'info', ['botinfo']);
  }

  run(client, message, args) {
    const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(message.guild.me.displayHexColor || 'BLUE')
			.addField('일반', [
        `**❯ 봇:** ${client.user.tag} (${client.user.id})`,
        `**❯ 업타임:** ${ms(client.uptime, { long: true })}`,
				`**❯ 서버:** ${client.guilds.cache.size.toLocaleString()} `,
				`**❯ 유저:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
				`**❯ 채널:** ${client.channels.cache.size.toLocaleString()}`,
        `**❯ 만든날짜:** ${new Date(client.user.createdTimestamp).toLocaleString()}`,
				`**❯ Node.js:** ${process.version}`,
				`**❯ 버전:** v${version}`,
				`**❯ Discord.js:** v${djsversion}`,
				'\u200b'
			])
			.addField('시스템', [
				`**❯ 플랫폼:** ${process.platform}`,
				`**❯ 업타임:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
        `\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`
			])
			.setTimestamp();

		message.channel.send(embed);
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}