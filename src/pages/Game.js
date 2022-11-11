import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/AnswerButton';
import Header from '../components/Header';
import { fetchQuestions, getAnswers } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currQuestion: 0,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { currQuestion } = this.state;
    const { token, dispatch, history } = this.props;
    await dispatch(fetchQuestions(token));
    const { questionList } = this.props;
    if (questionList.length === 0) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      await dispatch(getAnswers(questionList, currQuestion));
      this.setState({
        isLoading: false,
      });
    }
  }

  mapButtons = () => {
    const { currAnswers, correctAnswer } = this.props;
    console.log(currAnswers, correctAnswer);
    const num = -1;
    let incorrectIndex = num;
    return currAnswers.map((answer, i) => {
      if (answer === correctAnswer) {
        return <Button key={ i } label={ answer } testid="correct-answer" />;
      }
      incorrectIndex += 1;
      return (<Button
        key={ i }
        label={ answer }
        testid={ `wrong-answer-${incorrectIndex}` }
      />);
    });
  };

  render() {
    const { currQuestion, isLoading } = this.state;
    const { questionList } = this.props;
    return (
      <div>
        <Header />
        <h1>Game</h1>
        { !isLoading
          && (
            <div>
              <h1 name="category" data-testid="question-category">
                {questionList[currQuestion].category}
              </h1>
              <h3 name="text" data-testid="question-text">
                {questionList[currQuestion].question}
              </h3>
              <div data-testid="answer-options">
                { this.mapButtons() }
              </div>
            </div>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
  token: globalState.token.token,
  questionList: globalState.questions.questionList,
  currAnswers: globalState.answers.currAnswers,
  correctAnswer: globalState.answers.correctAnswer,
});

export default connect(mapStateToProps)(Game);
