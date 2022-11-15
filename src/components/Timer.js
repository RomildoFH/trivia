import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTimer } from '../redux/actions';

let clockInterval = 0;
let timeOutID = 0;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: 30,
      timeResetTimes: 0,
    };
  }

  componentDidMount() {
    this.handleTimer();
  }

  componentDidUpdate(prevState) {
    const { freeze, currQuestion } = this.props;
    const { timeResetTimes } = this.state;
    const maxIndexQuestions = 4;
    if (freeze
      && currQuestion <= maxIndexQuestions
      && prevState.freeze !== true) clearInterval(clockInterval);
    if (prevState.freeze === true
      && prevState.counting === false
      && currQuestion <= maxIndexQuestions
      && timeResetTimes <= maxIndexQuestions) {
      clearTimeout(timeOutID);
      this.setState((estadoAnt) => ({
        time: 30,
        timeResetTimes: estadoAnt.timeResetTimes + 1,
      }));
      this.handleTimer();
    }
  }

  handleTimer = () => {
    const { time } = this.state;
    const { expireQuestion, dispatch, counting } = this.props;
    const clock = setInterval(() => {
      if (time > 1 && counting === true) {
        this.setState((prevState) => ({
          time: prevState.time - 1,
        }), () => {
          const { state } = this;
          dispatch(updateTimer(state.time));
        });
      }
    }, '1000');
    clockInterval = clock;
    const timeOut = setTimeout(() => {
      clearInterval(clock);
      expireQuestion();
    }, '30000');
    timeOutID = timeOut;
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

const mapStateToProps = (globalState) => ({
  timer: globalState.timer,
});

export default connect(mapStateToProps)(Timer);
