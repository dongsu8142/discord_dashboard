import { useEffect, useState } from 'react';
import { MenuComponent } from '../../components/index';
import { getGuilds, getUserDetails } from '../../utils/api';

export function MenuPage({
  history,
}) {

  const [loading, setLoading] = useState(true);
  const [guilds, setGuilds] = useState({});

  useEffect(() => {
    getUserDetails()
      .then(({data}) => {
        return getGuilds();
      }).then(({data}) => {
        setGuilds(data);
        setLoading(false);
      }).catch ((err) => {
        history.push('/');
        setLoading(false);
      })
  }, [history])

  return !loading && (
    <div>
      <h1>Menupage</h1>
      <MenuComponent guilds={guilds} />
    </div>
  )
}