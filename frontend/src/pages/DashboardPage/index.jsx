import { useState, useEffect } from 'react';
import { getGuildConfig, getGuildRoles, getUserDetails, updateDefaultRole, updateGuildPrefix, getGuildChannels, updateJoinChannel, updateLeaveChannel } from '../../utils/api';
import { DashboardMenu } from '../../components/DashboardMenu';

export function DashboardPage({
  history,
  match
}) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ config, setConfig ] = useState({});
  const [ roles, setRoles ] = useState([]);
  const [ channels, setChannels ] = useState([]);

  useEffect(() => {
    getUserDetails()
      .then(({data}) => {
        setUser(data);
        return getGuildConfig(match.params.id);
      })
      .then(({data}) => {
        setConfig(data);
        return getGuildRoles(match.params.id);
      })
      .then(({data}) => {
        setRoles(data);
        return getGuildChannels(match.params.id);
      })
      .then(({data}) => {
        setChannels(data);
        setLoading(false);
      })
      .catch ((err) => {
        history.push('/');
        setLoading(false);
      })
  }, [history, match]);

  const updateGuildPrefixParent = async (prefix) => {
    try {
      const update = await updateGuildPrefix(match.params.id, prefix);
    } catch (err) {
      console.log(err)
    }
  }

  const updateDefaultRoleParent = async (roleId, roleOn) => {
    updateDefaultRole(match.params.id, roleId, roleOn);
  }

  const updateJoinChannelParent = async (joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage) => {
    updateJoinChannel(match.params.id, joinMemberChannel, joinMemberChannelOn, joinMemberChannelMessage);
  }

  const updateLeaveChannelParent = async (leaveMemberChannel, leaveMemberChannelOn, leaveMemberChannelMessage) => {
    updateLeaveChannel(match.params.id, leaveMemberChannel, leaveMemberChannelOn, leaveMemberChannelMessage);
  }

  return !loading && (
    <div>
      <section id="main-dashboard-content">
        <h1 id="welcome-title">데시보드 페이지</h1>
        <section id="grid-container">
          <DashboardMenu 
            user={user} 
            config={config} 
            roles={roles}
            channels={channels}
            updateJoinChannel={updateJoinChannelParent}
            updatePrefix={updateGuildPrefixParent} 
            updateRole={updateDefaultRoleParent}
            updateLeaveChannel={updateLeaveChannelParent}
          />
        </section>
      </section>
    </div>
  )
}