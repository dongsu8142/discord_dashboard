// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberRemove
const BaseEvent = require('../utils/structures/BaseEvent');
const GuildConfig = require('../database/schemas/GuildConfig');

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }
  
  async run(client, member) {
    try{
      const guild = member.guild;
      const guildId = guild.id;
      const guildConfig = await GuildConfig.findOne({ guildId })
      const joinMemberChannelOn = guildConfig.get("leaveMemberChannelOn", Boolean);
      if(joinMemberChannelOn) {
        const leavechannel = guildConfig.get("leaveMemberChannel");
        const channel = guild.channels.cache.find(channel => channel.id == leavechannel)
        const message = guildConfig.get("leaveMemberChannelMessage");
        const result1 = message.replace( /{user}/gi, member.user.username);
        channel.send(result1);
      }
    } catch (err) {
      console.log(err);
    }
  }
}