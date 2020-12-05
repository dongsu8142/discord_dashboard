const BaseEvent = require('../../utils/structures/BaseEvent');
const GuildConfig = require('../../database/schemas/GuildConfig');
const Levels = require('discord-xp');

Levels.setURL(process.env.MONGODB_URL);

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (!message.guild) return;
    if (message.author.bot) return;
    const randomXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      message.channel.send(`레벨업!! 현재레벨: ${user.level}`);//TODO: 웹사이트와 연결하여 문장바꾸기
    }
    const guildConfig = await GuildConfig.findOne({ guildId: message.guild.id });
    let prefix
    if (guildConfig) {
      prefix = guildConfig.get('prefix');
    } else {
      await GuildConfig.create({
        guildId: message.guild.id,
        joinMemberChannel: message.guild.systemChannelID,
        leaveMemberChannel: message.guild.systemChannelID,
      })
      const guildConfig2 = await GuildConfig.findOne({ guildId: message.guild.id });
      prefix = guildConfig2.get('prefix');
    }
    if (!prefix) {
      prefix = "/"
    }
    if (message.content.startsWith(prefix)) {
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.commands.get(cmdName);
      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}