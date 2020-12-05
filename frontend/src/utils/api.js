import axios from 'axios';
const url = "http://jjam6.ml:3000"

export function getUserDetails() {
    return axios.get(`${url}/api/auth`, { withCredentials: true });
}

export function getGuilds() {
    return axios.get(`${url}/api/discord/guilds`, { withCredentials: true });
}

export function getGuildConfig(guildId) {
    return axios.get(`${url}/api/discord/guilds/${guildId}/config`, { withCredentials: true });
}

export function updateGuildPrefix(guildId, prefix) {
    return axios.put(`${url}/api/discord/guilds/${guildId}/prefix`, {prefix}, { withCredentials: true });
}

export function updateDefaultRole(guildId, defaultRole, defaultRoleOn) {
    return axios.put(`${url}/api/discord/guilds/${guildId}/roles/default`, {defaultRole: defaultRole, defaultRoleOn: defaultRoleOn}, { withCredentials: true });
}

export function getGuildRoles(guildId) {
    return axios.get(`${url}/api/discord/guilds/${guildId}/roles`, { withCredentials: true });
}

export function getGuildChannels(guildId) {
    return axios.get(`${url}/api/discord/guilds/${guildId}/channels`, { withCredentials: true });
}

export function updateJoinChannel(guildId, joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage) {
    return axios.put(`${url}/api/discord/guilds/${guildId}/channels/join`, {joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage}, { withCredentials: true });
}

export function updateLeaveChannel(guildId, leaveMemberChannel, leaveMemberChannelOn, leaveMemberChannelMessage) {
    return axios.put(`${url}/api/discord/guilds/${guildId}/channels/leave`, {leaveMemberChannel, leaveMemberChannelOn, leaveMemberChannelMessage}, { withCredentials: true });
}