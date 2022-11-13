import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
      </div>
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

export default connect(mapStateToProps)(Feedback);
