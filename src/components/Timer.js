import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTimer } from '../redux/actions';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer = () => {
    const { time } = this.state;
    const { expireQuestion, dispatch } = this.props;
    const clock = setInterval(() => {
      if (time > 1) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }), () => {
          const { state } = this;
          dispatch(updateTimer(state.time));
        });
      }
    }, '1000');
    setTimeout(() => {
      clearInterval(clock);
      expireQuestion();
    }, '30000');
  };

  render() {
    const { time } = this.state;
    return (
      <h3
        id="timer-component"
        data-testid="timer"
      >
        { time }
      </h3>
    );
  }
}

Timer.propTypes = {
  id: PropTypes.string,
  testid: PropTypes.string,
  buttonName: PropTypes.string,
}.isRequired;

export default connect()(Timer);
