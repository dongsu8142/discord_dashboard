import { useEffect, useState } from 'react';
import { MenuComponent } from '../../components/index';
import { getGuilds, getUserDetails } from '../../utils/api';

export function MenuPage({
  history,
}) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [guilds, setGuilds] = useState({});

  useEffect(() => {
    getUserDetails()
      .then(({data}) => {
        setUser(data);
        return getGuilds();
      }).then(({data}) => {
        setGuilds(data);
        setLoading(false);
      }).catch ((err) => {
        history.push('/');
        setLoading(false);
      })
  }, [])

  return !loading && (
    <div>
      <h1>Menupage</h1>
      <MenuComponent guilds={guilds} />
    </div>
  )
}