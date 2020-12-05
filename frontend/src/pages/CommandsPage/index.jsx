import { Text } from '@chakra-ui/react';
export function ConmmandsPage(props) {
    return (
      <div>
        <section id="main-dashboard-content">
          <h1 id="welcome-title">명령아</h1>
          <section id="grid-container">
            <div className="grid-item one">
              <Text fontSize="xl">음악</Text>
              <li>재생[play] 음악을 재생합니다</li>
              <li>볼륨 (숫자)[volume] 음악의 음량를 조절하거나 음량을 보여줍니다.</li>
              <li>스킵[skip] 음악을 건너뜁니다.</li>
              <li>중지[stop] 음악을 중지합니다.</li>
              <li>셔플[shuffle] 음악의 재생목록을 섞습니다.</li>
              <li>재생목록[queue] 음악의 재생목록을 보여줍니다.</li>
              <li>음악정보[musicinfo, nowplaying] 현재 재생중인 음악의 정보를 보여줍니다.</li>
              <Text fontSize="xl">정보</Text>
              <li>유저정보[userinfo] 유저정보를 보여줍니다.</li>
              <li>서버정보['serverinfo', 'guildinfo', '길드정보'] 서버정보를 보여줍니다.</li>
              <li>봇정보[botinfo] 봇정보를 보여줍니다.</li>
              <li>핑[ping] 현재 봇의 딜레이를 보여줍니다.</li>
              <Text fontSize="xl">어드민</Text>
              <li>밴[ban] 유저를 차단합니다.</li>
              <li>킥[kick] 유저를 추방합니다.</li>
              <Text fontSize="xl">유틸</Text>
              <li>날씨 (지역)[weather] 현재 지역의 날씨를 알려줍니다.</li>
              <Text fontSize="xl">레벨</Text>
              <li>리더보드[leaderboard] 서버의 레벨 순위를 보여줍니다.</li>
              <li>랭크[rank] 현재 레벨과 경헙치를 보여줍니다.</li>
            </div>
          </section>
        </section>
      </div>
    );
  }