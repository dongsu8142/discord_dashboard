import { Link } from "react-router-dom"

export function MenuComponent({
  guilds,
}) {

  return (
    <div>
        {guilds.included.map((guild, key) => (
            <div key={key}>
                <li>{guild.name}</li>
                <Link to={`/dashboard/${guild.id}`}>View Dashboard</Link>
            </div>
        ))}
        {guilds.excluded.map((guild, key) => (
          <div key={key}>
            <li>{guild.name}</li>
            <a href={`https://discord.com/oauth2/authorize?client_id=778570545935024149&scope=bot&permissions=1945201982&guild_id=${guild.id}`}>Setup Bot</a>
          </div>
        ))}
    </div>
  )
}