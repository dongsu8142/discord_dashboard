// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const BaseEvent = require('../utils/structures/BaseEvent');
const GuildConfig = require('../database/schemas/GuildConfig');

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    try{
      const guild = member.guild;
      const guildId = guild.id;
      const guildConfig = await GuildConfig.findOne({ guildId })
      const defaultRoleOn = guildConfig.get("defaultRoleOn", Boolean);
      const joinMemberChannelOn = guildConfig.get("joinMemberChannelOn", Boolean);
      if(defaultRoleOn) {
        const defaultRole = guildConfig.get("defaultRole");
        const role = guild.roles.cache.get(defaultRole);
        member.roles.add(role).catch(err => {
          console.log(err)
          member.send("역할 지급에 문제가 발생하였습니다. 관리자에게 전달하세요.")
        });
      }
      if(joinMemberChannelOn) {
        const joinchannel = guildConfig.get("joinMemberChannel");
        const channel = guild.channels.cache.find(channel => channel.id == joinchannel)
        const message = guildConfig.get("joinMemberChannelMessage");
        const result1 = message.replace( /{user}/gi, member.user.username);
        const result2 = result1.replace( /{server}/gi, member.guild.name);
        channel.send(result2);
      }
    } catch (err) {
      console.log(err);
    }
  }
}