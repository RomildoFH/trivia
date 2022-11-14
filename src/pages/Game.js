import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';
import Answerbutton from '../components/AnswerButton';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenValidating: true,
      loadingQuestions: true,
      isLoading: true,
      currQuestion: 0,
      response: false,
      // questionType: '',
      // questionTitle: '',
    };
  }

  async componentDidMount() {
    await this.validateLogin();
  }

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
        alreadyRandom: false,
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

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  getShuffledArr = (arr) => [...arr].map((_, i, arrCopy) => {
    const rand = i + (Math.floor(Math.random() * (arrCopy.length - i)));
    [arrCopy[rand], arrCopy[i]] = [arrCopy[i], arrCopy[rand]];
    return arrCopy[i];
  });

  handleResponse = () => {
    this.setState({
      response: true,
    });
  };

  renderGame = () => {
    const { questions } = this.props;
    const { response, alreadyRandom } = this.state;
    console.log('render game chamado');
    // console.log(questions);
    const { currQuestion } = this.state;
    const questionsArray = questions.results;
    const questionObject = questionsArray[currQuestion];
    const questionType = questionObject.category;
    const questionTitle = questionObject.question;
    const correctAnswer = questionObject.correct_answer;
    const incorrectAnswers = questionObject.incorrect_answers;
    const answersArray = [correctAnswer, ...incorrectAnswers];
    console.log(answersArray);
    const randomArray = alreadyRandom ? answersArray : this.getShuffledArr(answersArray);
    // console.log(randomArray);
    // console.log(answersArray);
    return (
      <div>
        <h2 data-testid="question-text">{ questionTitle }</h2>
        <h4 data-testid="question-category">{ questionType }</h4>
        <div data-testid="answer-options">
          {
            randomArray.map((answer, index) => (
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
    const { tokenValidating, isLoading } = this.state;
    return (
      <div>
        {
          tokenValidating ? (<p>Validando dados de acesso</p>) : (<Header />)
        }
        {
          console.log(`o isLoading é ${isLoading}`)
        }
        {
          (isLoading) ? (<p>Carregando jogo</p>) : (this.renderGame())
        }
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.name,
  assertions: globalState.assertions,
  score: globalState.score,
  gravatarEmail: globalState.gravatarEmail,
  token: globalState.token,
  questions: globalState.questions.questions,

});

export default connect(mapStateToProps)(Game);
