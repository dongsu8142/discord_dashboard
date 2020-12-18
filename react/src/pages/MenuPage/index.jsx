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
      <section id="main-dashboard-content">
        <h1 id="welcome-title">메뉴 페이지</h1>
        <section id="grid-container">
          <MenuComponent guilds={guilds} />
        </section>
      </section>
    </div>
  )
}