import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetScore } from '../redux/actions';

class Feedback extends React.Component {
  feedbackMessage = () => {
    const { assertions } = this.props;
    const passValue = 3;
    return assertions < passValue ? (
      <h1 data-testid="feedback-text">Could be better...</h1>
    )
      : (
        <h1 data-testid="feedback-text">Well Done!</h1>
      );
  };

  resetGame = () => {
    const { dispatch } = this.props;
    dispatch(resetScore());
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        {
          this.feedbackMessage()
        }
        <div>
          <p>
            Sua pontuação:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            Acertos:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
        </div>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.resetGame }
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.resetGame }
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
