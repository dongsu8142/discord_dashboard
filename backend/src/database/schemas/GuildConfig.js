const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: '/',
    },
    defaultRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    defaultRoleOn: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false,
    },
    joinMemberChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    joinMemberChannelMessage: {
        type: mongoose.SchemaTypes.String,
        required: false,
        default: "{user}님 {server}에 오신 걸 환영합니다."
    },
    joinMemberChannelOn: {
        type: mongoose.SchemaTypes.Boolean,
        required: true,
        default: false,
    },
    leavelMemberChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    memberLogChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    }
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);