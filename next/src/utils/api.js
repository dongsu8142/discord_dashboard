import axios from "axios";
const url = "https://jjab6.ml:2053";

export async function getUserDetails(cookie) {
  return await axios({
    method: "GET",
    url: `${url}/api/auth`,
    headers: {
      cookie,
    },
  });
}

export async function getGuilds(cookie) {
  return await axios({
    method: "GET",
    url: `${url}/api/discord/guilds`,
    headers: {
      cookie,
    },
  });
}

export async function getGuildConfig(cookie, guildId) {
  return await axios({
    method: "GET",
    url: `${url}/api/discord/guilds/${guildId}/config`,
    headers: {
      cookie,
    },
  });
}

export async function updateGuildPrefix(guildId, prefix) {
  return await axios({
    method: "PUT",
    url: `${url}/api/discord/guilds/${guildId}/prefix`,
    data: { prefix }
  });
}

export async function updateDefaultRole(
  guildId,
  defaultRole,
  defaultRoleOn
) {
  return await axios({
    method: "PUT",
    url: `${url}/api/discord/guilds/${guildId}/roles/default`,
    data: { defaultRole: defaultRole, defaultRoleOn: defaultRoleOn },
  });
}

export async function getGuildRoles(cookie, guildId) {
  return await axios({
    method: "GET",
    url: `${url}/api/discord/guilds/${guildId}/roles`,
    headers: {
      cookie,
    },
  });
}

export async function getGuildChannels(cookie, guildId) {
  return await axios({
    method: "GET",
    url: `${url}/api/discord/guilds/${guildId}/channels`,
    headers: {
      cookie,
    },
  });
}

export async function updateJoinChannel(
  guildId,
  joinMemberChannel,
  joinMemberChannelOn,
  joinMemberChannelMessage
) {
  return await axios({
    method: "PUT",
    url: `${url}/api/discord/guilds/${guildId}/channels/join`,
    data: { joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage }
  });
}

export async function updateLeaveChannel(
  guildId,
  leaveMemberChannel,
  leaveMemberChannelOn,
  leaveMemberChannelMessage
) {
  return await axios({
    method: "PUT",
    url: `${url}/api/discord/guilds/${guildId}/channels/leave`,
    data: {
      leaveMemberChannel,
      leaveMemberChannelOn,
      leaveMemberChannelMessage,
    },
  });
}
