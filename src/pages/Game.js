import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions, increaseScore } from '../redux/actions';
import Answerbutton from '../components/AnswerButton';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenValidating: true,
      loadingQuestions: true,
      isLoading: true,
      currQuestion: 0,
      response: false,
      expired: false,
      score: 0,
    };
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
    if (questions.response_code === errorCode) {
      history.push('/');
    } else {
      this.setState({
        tokenValidating: false,
        loadingQuestions: false,
      }, () => setTimeout(() => {
        this.loadingValidate();
      }, '0'));
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
    });
  };

  expireQuestion = () => {
    this.setState({
      expired: true,
    });
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

  render() {
    const { tokenValidating, isLoading, score } = this.state;
    return (
      <div>
        {
          tokenValidating ? (<p>Validando dados de acesso</p>)
            : (<Header score={ score } />)
        }
        <Timer expireQuestion={ this.expireQuestion } />
        {
          (isLoading) ? (<p>Carregando jogo</p>) : (this.renderGame())
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
  name: globalState.name,
  assertions: globalState.assertions,
  score: globalState.player.score,
  gravatarEmail: globalState.gravatarEmail,
  token: globalState.token,
  questions: globalState.questions.questions,
  time: globalState.timer.time,

});

export default connect(mapStateToProps)(Game);
