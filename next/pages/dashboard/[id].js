import {
  getUserDetails,
  getGuildChannels,
  getGuildConfig,
  getGuildRoles,
  updateDefaultRole,
  updateGuildPrefix,
  updateJoinChannel,
  updateLeaveChannel,
} from "../../src/utils/api";
import { useRouter } from "next/router";
import Panel from "../../src/components/panel";

const Dashboard = ({ config, roles, channels }) => {
  const router = useRouter();
  const { id } = router.query;
  const updateGuildPrefixParent = async prefix => {
    await updateGuildPrefix(id, prefix);
  };

  const updateDefaultRoleParent = async (roleId, roleOn) => {
    updateDefaultRole(id, roleId, roleOn);
  };

  const updateJoinChannelParent = async (
    joinMemberChannel,
    joinMemberChannelOn,
    joinMemberChannelMessage
  ) => {
    updateJoinChannel(
      id,
      joinMemberChannel,
      joinMemberChannelOn,
      joinMemberChannelMessage
    );
  };

  const updateLeaveChannelParent = async (
    leaveMemberChannel,
    leaveMemberChannelOn,
    leaveMemberChannelMessage
  ) => {
    updateLeaveChannel(
      id,
      leaveMemberChannel,
      leaveMemberChannelOn,
      leaveMemberChannelMessage
    );
  };
  return (
    <>
      <h1 id="welcome-title">대시보드 페이지</h1>
      <Panel
        config={config}
        roles={roles}
        channels={channels}
        updateJoinChannel={updateJoinChannelParent}
        updatePrefix={updateGuildPrefixParent}
        updateRole={updateDefaultRoleParent}
        updateLeaveChannel={updateLeaveChannelParent}
      />
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const cookie = context.req.headers.cookie ? context.req.headers.cookie : "";
  const user = await getUserDetails(cookie);
  const config = (await getGuildConfig(cookie, id)).data;
  const roles = (await getGuildRoles(cookie, id)).data;
  const channels = (await getGuildChannels(cookie, id)).data;
  return {
    props: {
      config,
      roles,
      channels,
    },
  };
}
