const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('핑', 'info', ['ping']);
  }

  run(client, message, args) {
    message.channel.send('측정중').then(resultMessage => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp

      resultMessage.edit(`딜레이: ${ping}, API 딜레이: ${client.ws.ping}`)
    });
  }
}