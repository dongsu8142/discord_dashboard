export default function Sidebar() {
  return (
    <section id="sidebar">
      <section className="title-container">
        <img src="/speedometer.svg" width="40px" alt="logo" />
        <h1>짭육</h1>
      </section>
      <section className="links-container">
        <div className="links">
          <div className="icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <a href="/">홈</a>
        </div>
        <div className="links">
          <div className="icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <a href="/commands">명령어</a>
        </div>
        <div className="links">
          <div className="icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <a href="/menu">메뉴</a>
        </div>
        <div className="links">
          <div className="icon">
            <i className="fas fa-chart-bar"></i>
          </div>
          <a href="https://127.0.0.1:2053/api/auth/discord">로그인</a>
        </div>
      </section>
    </section>
  );
}
