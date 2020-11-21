import { useState, useEffect } from 'react';
import { getGuildConfig, getGuildRoles, getUserDetails, updateDefaultRole, updateGuildPrefix } from '../../utils/api';
import { DashboardMenu } from '../../components/DashboardMenu';

export function DashboardPage({
  history,
  match
}) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ config, setConfig ] = useState({});
  const [ roles, setRoles ] = useState([]);

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
        setLoading(false);
      })
      .catch ((err) => {
        history.push('/');
        setLoading(false);
      })
  }, []);

  const updateGuildPrefixParent = async (prefix) => {
    try {
      const update = await updateGuildPrefix(match.params.id, prefix);
      console.log(update)
    } catch (err) {
      console.log(err)
    }
  }

  const updateDefaultRoleParent = async (roleId) => {
    updateDefaultRole(match.params.id, roleId);
  }

  return !loading && (
    <div>
      <h1>Dashboard Page</h1>
      <DashboardMenu 
        user={user} 
        config={config} 
        roles={roles}
        updatePrefix={updateGuildPrefixParent} 
        updateRole={updateDefaultRoleParent}
      />
    </div>
  )
}