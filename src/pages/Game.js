import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <h1>Game</h1>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.name,
  assertions: globalState.assertions,
  score: globalState.score,
  gravatarEmail: globalState.gravatarEmail,
  token: globalState.token,
});

export default connect(mapStateToProps)(Game);
