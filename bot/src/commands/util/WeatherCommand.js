const BaseCommand = require('../../utils/structures/BaseCommand');
const request = require('request');
const { MessageEmbed } = require('discord.js');

module.exports = class WeatherCommand extends BaseCommand {
  constructor() {
    super('날씨', 'util', ['weather']);
  }

  async run(client, message, args) {
    const area = encodeURI(args.join(' '));
    request(`https://manyyapi.herokuapp.com/weather/${area}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const accountObj = JSON.parse(body);
        const embed = new MessageEmbed()
          .setTitle("날씨")
          .addField("지역", accountObj.지역, true)
          .addField("현재온도", accountObj.현재온도, true)
          .addField("체감온도", accountObj.체감온도, true)
          .addField("정보", accountObj.정보, true)
          .addField("자외선", accountObj.자외선, true)
          .addField("최저온도/최고온도", accountObj.최저최고온도, true)
          .addField("미세먼지", accountObj.미세먼지, true)
          .addField("초미세먼지", accountObj.초미세먼지, true)
          .addField("오존 지수", accountObj.오존지수, true);
        message.channel.send(embed);
      }
    })
  }
}