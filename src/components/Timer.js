import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    const { time } = this.state;
    const { expireQuestion } = this.props;
    const clock = setInterval(() => {
      if (time > 1) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }));
        console.log('timer montou');
      }
    }, '1000');
    setTimeout(() => {
      clearInterval(clock);
      expireQuestion();
    }, '30000');
  }

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

export default Timer;
