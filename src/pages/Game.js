import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { fetchQuestions, increaseScore, updateTimer } from '../redux/actions';
import Answerbutton from '../components/AnswerButton';
import Timer from '../components/Timer';
import gameInitialState from './helpers/gameState';

class Game extends React.Component {
  constructor() {
    super();
    this.state = gameInitialState;
  }

  async componentDidMount() {
    await this.validateLogin();
  }

  handleScore = ({ target: { id } }) => {
    const { currQuestion } = this.state;
    const { time, questions, dispatch, score } = this.props;
    const ten = 10;
    if (id === 'correct-answer') {
      const questionsArray = questions.results;
      const questionObject = questionsArray[currQuestion];
      const questionDifficulty = questionObject.difficulty;
      const difficultyValue = { hard: 3, medium: 2, easy: 1 };
      const valueScore = ten + (time * difficultyValue[questionDifficulty]);
      const sum = score + valueScore;
      dispatch(increaseScore(sum, 1));
      this.setState({
        expired: true,
      });
    } else {
      this.setState({
        expired: true,
      });
    }
  };

  validateLogin = async () => {
    const { dispatch, token } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${token.token}`;
    await dispatch(fetchQuestions(url));
    const { questions, history } = this.props;
    const errorCode = 3;
    if (questions.response_code === errorCode || token.token === 'INVALID_TOKEN') {
      history.push('/');
    } else {
      this.setState({
        tokenValidating: false,
        loadingQuestions: false,
      }, () => setTimeout(() => {
        this.loadingValidate();
      }, ''));
    }
  };

  loadingValidate = () => {
    const { tokenValidating, loadingQuestions } = this.state;

    if (tokenValidating === false && loadingQuestions === false) {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleResponse = () => {
    this.setState({
      response: true,
      freeze: true,
      counting: false,
    });
  };

  expireQuestion = () => {
    this.setState({
      expired: true,
      counting: false,
      freeze: true,
    });
  };

  nextQuestion = () => {
    const { dispatch } = this.props;
    const { currQuestion } = this.state;
    const maxIndexQuestions = 4;
    const maxTime = 30;
    dispatch(updateTimer(maxTime));
    if (currQuestion < maxIndexQuestions) {
      this.setState((prevState) => ({
        currQuestion: prevState.currQuestion + 1,
        response: false,
        expired: false,
        freeze: false,
        counting: true,
      }));
    }
  };

  renderGame = () => {
    const { questions } = this.props;
    const { response, expired } = this.state;
    const { currQuestion } = this.state;
    const questionsArray = questions.results;
    const questionObject = questionsArray[currQuestion];
    const questionType = questionObject.category;
    const questionTitle = questionObject.question;
    const correctAnswer = questionObject.correct_answer;
    const incorrectAnswers = questionObject.incorrect_answers;
    const { shuffledAlternatives } = questionObject;
    return (
      <div>
        <h2 data-testid="question-text">{ questionTitle }</h2>
        <h4 data-testid="question-category">{ questionType }</h4>
        <div data-testid="answer-options">
          {
            shuffledAlternatives.map((answer, index) => (
              answer === correctAnswer
                ? (
                  <Answerbutton
                    id="correct-answer"
                    key={ index }
                    testid="correct-answer"
                    buttonName={ answer }
                    borderStyle="3px solid rgb(6, 240, 15)"
                    handleResponse={ this.handleResponse }
                    response={ response }
                    disabled={ expired }
                    handleScore={ this.handleScore }
                  >
                    { answer }
                  </Answerbutton>)
                : (
                  <Answerbutton
                    id={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                    key={ index }
                    testid={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                    buttonName={ answer }
                    borderStyle="3px solid red"
                    handleResponse={ this.handleResponse }
                    response={ response }
                    disabled={ expired }
                    handleScore={ this.handleScore }
                  >
                    { answer }
                  </Answerbutton>)
            ))
          }
        </div>
      </div>
    );
  };

  handleNext = () => {
    const { currQuestion, expired } = this.state;
    const { history, name, assertions, gravatarEmail, score } = this.props;
    const maxIndexQuestions = 4;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    if (currQuestion === maxIndexQuestions && expired === true) {
      history.push('/feedback');
      let storedRanking = [];
      const currRanking = { name, assertions, gravatarEmail: url, score };
      let newRanking = [];
      if (localStorage.getItem('ranking')) {
        storedRanking = JSON.parse(localStorage.getItem('ranking'));
        newRanking = [...storedRanking, currRanking];
        newRanking.sort((a, b) => b.score - a.score);
      }
      if (!localStorage.getItem('ranking')) {
        newRanking = [currRanking];
      }
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    } else {
      this.nextQuestion();
    }
  };

  render() {
    const {
      tokenValidating,
      isLoading,
      score,
      expired,
      freeze,
      counting,
      currQuestion,
    } = this.state;
    return (
      <div>
        {
          tokenValidating ? (<p>Validando dados de acesso</p>)
            : (<Header score={ score } />)
        }
        <Timer
          expireQuestion={ this.expireQuestion }
          freeze={ freeze }
          counting={ counting }
          currQuestion={ currQuestion }
        />
        {
          (isLoading) ? (<p>Carregando jogo</p>) : (this.renderGame())
        }
        {
          expired
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNext }
              >
                Next
              </button>
            )
        }
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
  time: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
  token: globalState.token,
  questions: globalState.questions.questions,
  time: globalState.timer.time,
});

export default connect(mapStateToProps)(Game);
