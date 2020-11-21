const passport = require('passport');
const DiscordStrategy = require('passport-discord');
const User = require('../database/schemas/User');
const OAuth2Credentials = require('../database/schemas/OAuth2Credentials');
const { encrypt } = require('../utils/utils');

passport.serializeUser((user, done) => {
  done(null, user.discordId)
});

passport.deserializeUser(async (discordId, done) => {
  try {
    const user = await User.findOne({discordId});
    return user ? done(null, user) : done(null, null)
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identify', 'guilds'],
  }, async (accessToken, refreshToken, profile, done) => {
      const encryptedAccessToken = encrypt(accessToken).toString();
      const encryptedRefreshToken = encrypt(refreshToken).toString();
      const {id, username, discriminator, avatar, guilds} = profile;
      try {
        const findUser = await User.findOneAndUpdate({ discordId: id }, {
          discordTag: `${username}#${discriminator}`,
          avatar,
          guilds,
        }, {new: true});
        const findCredentials = await OAuth2Credentials.findOneAndUpdate({ discordId: id }, {
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken
        })
        if (findUser) {
          if(!findCredentials) {
            const newCredentials = await OAuth2Credentials.create({
              accessToken: encryptedAccessToken,
              refreshToken: encryptedRefreshToken,
              discordId: id,
            });
          }
          return done(null, findUser);
        } else {
          const newUser = await User.create({
            discordId: id,
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          });
          const newCredentials = await OAuth2Credentials.create({
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
            discordId: id,
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
  })
);