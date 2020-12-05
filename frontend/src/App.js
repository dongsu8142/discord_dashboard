import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LandingPage, MenuPage, DashboardPage, ConmmandsPage } from './pages';

function App() {
  return (
    <Switch>
      <Route path="/" exact={ true } component={ LandingPage } />
      <Route path="/menu" exact={ true } component={ MenuPage } />
      <Route path="/dashboard/:id" exact={ true } component={DashboardPage} />
      <Route path="/commands" exact={ true } component={ ConmmandsPage } />
    </Switch>
  );
}

export default App;
