import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenValidating: true,
      loadingQuestions: true,
      isLoading: true,
      currQuestion: 0,
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
      }, () => setTimeout(() => {
        this.loadingValidate();
      }, '1000'));
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

  aplyStyle = ({ target }) => {
    const { questions } = this.props;
    const { currQuestion } = this.state;
    const questionsArray = questions.results;
    const questionObject = questionsArray[currQuestion];
    const correctAnswer = questionObject.correct_answer;
    if (target.innHTML === correctAnswer) {
      const correct = document.getElementById('correct_answer');
      correct.style.border = '3px solid rgb(6, 240, 15)';
      console.log(target.innText);
    } else {
      const wrong = document.getElementById(target.id);
      wrong.style.border = '3px solid red';
      console.log(target.innText);
    }
  };

  renderGame = () => {
    const { questions } = this.props;
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
    const randomArray = this.getShuffledArr(answersArray);
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
                  <button
                    id="correct-answer"
                    type="button"
                    key={ index }
                    data-testid="correct-answer"
                    onClick={ (event) => this.aplyStyle(event) }
                  >
                    { answer }
                  </button>)
                : (
                  <button
                    id={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                    type="button"
                    key={ index }
                    data-testid={ `wrong-answer-${incorrectAnswers.indexOf(answer)}` }
                    onClick={ (event) => this.aplyStyle(event) }
                  >
                    { answer }
                  </button>)
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

// alteração
