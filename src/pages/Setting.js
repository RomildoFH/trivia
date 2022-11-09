import React from 'react';
import { connect } from 'react-redux';

class Setting extends React.Component {
  render() {
    return (
      <h1 data-testid="settings-title">Setting</h1>
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

export default connect(mapStateToProps)(Setting);
