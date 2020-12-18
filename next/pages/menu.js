import Axios from "axios";
import Link from "next/link";
import { getGuilds, getUserDetails } from "../src/utils/api";

function Menu({ guilds }) {
  return (
    <>
      {guilds ? (
        <>
          <h1 id="welcome-title">메뉴 페이지</h1>
          {guilds.included.map((guild, key) => (
            <div className="media" key={key}>
              <div className="box">
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                    className="mr-3 icon"
                    alt="icon"
                  />
                ) : (
                  <span></span>
                )}
              </div>
              <div className="media-body">
                <h5 className="mt-0">{guild.name}</h5>
                <Link href={`/dashboard/${guild.id}`}>View Dashboard</Link>
              </div>
            </div>
          ))}
          {guilds.excluded.map((guild, key) => (
            <div className="media" key={key}>
              <div className="box">
                {guild.icon ? (
                  <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
                    className="mr-3 icon"
                    alt="icon"
                  />
                ) : (
                  <span></span>
                )}
              </div>
              <div className="media-body">
                <h5 className="mt-0">{guild.name}</h5>
                <a
                  href={`https://discord.com/oauth2/authorize?client_id=778570545935024149&scope=bot&permissions=1945201982&guild_id=${guild.id}`}
                >
                  Setup Bot
                </a>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          문제가 발생했습니다. 이메일로 문의해 주세요. 이메일에 문의하기 전 로그인을 했나 생각해 주세요.
        </>
      )}
    </>
  );
}

export default Menu;

export async function getServerSideProps(ctx) {
  const cookie = ctx.req.headers.cookie ? ctx.req.headers.cookie : "";
  const user = await getUserDetails(cookie);
  const guilds = await getGuilds(cookie);
  return {
    props: {
      guilds: guilds.data,
    },
  };
}
