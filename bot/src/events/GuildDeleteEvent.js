// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildDelete
const BaseEvent = require('../utils/structures/BaseEvent');
const GuildConfig = require('../database/schemas/GuildConfig');

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }
  
  async run(client, guild) {
    try{
      const guildConfig = await GuildConfig.remove({
        guildId: guild.id,
      });
      console.log('Bot has leaved the server. remove to DB');
    } catch (err) {
      console.log(err);
    }
  }
}