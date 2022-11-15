import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const { assertions } = this.props;
    const passValue = 3;
    return assertions < passValue ? (
      <p data-testid="feedback-text">Could be better...</p>
    )
      : (
        <p data-testid="feedback-text">Well Done!</p>
      );
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        {
          this.feedbackMessage()
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
  gravatarEmail: globalState.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
