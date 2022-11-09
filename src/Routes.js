import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Setting from './pages/Setting';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/setting" component={ Setting } />
      </Switch>
    );
  }
}

export default Routes;
