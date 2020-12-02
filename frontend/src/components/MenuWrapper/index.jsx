import { Link } from "react-router-dom"

export function MenuComponent({
  guilds,
}) {

  return (
    <div className="grid-item one">
        {guilds.included.map((guild, key) => (
            <div className="media" key={key}>
              <div className="box">
                {guild.icon ? <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} className="mr-3 icon" alt="icon" /> : <span></span>}
              </div>
              <div className="media-body">
                  <h5 className="mt-0">{guild.name}</h5>
                  <Link to={`/dashboard/${guild.id}`}>View Dashboard</Link>
              </div>
            </div>
        ))}
        {guilds.excluded.map((guild, key) => (
          <div className="media" key={key}>
            <div className="box">
              {guild.icon ? <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`} className="mr-3 icon" alt="icon" /> : <span></span>}
            </div>
            <div className="media-body">
              <h5 className="mt-0">{guild.name}</h5>
              <a href={`https://discord.com/oauth2/authorize?client_id=778570545935024149&scope=bot&permissions=1945201982&guild_id=${guild.id}`}>Setup Bot</a>
            </div>
          </div>
        ))}
    </div>
  )
}