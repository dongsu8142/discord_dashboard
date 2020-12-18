const BaseCommand = require('../../utils/structures/BaseCommand');
const { createApi } = require('unsplash-js');

module.exports = class ImageCommand extends BaseCommand {
  constructor() {
    super('이미지', 'utils', ['image']);
  }

  run(client, message, args) {
    const query = args.join(' ');
    const unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY
    });
    unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 20
    })
    .then(result => {
      if (result.errors) {
        message.channel.send("에러 발생")
      } else {
        if (result.response.total != 0) {
          const random = Math.floor(Math.random() * result.response.results.length)
          const photo = result.response.results[random].urls.raw;
          message.channel.send(photo)
        } else {
          message.channel.send("검색결과가 없습니다.")
        }
      }
    })
  }
}