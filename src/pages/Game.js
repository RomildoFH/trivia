import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../components/AnswerButton';
import Header from '../components/Header';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      currQuestion: 0,
      currAnswers: [],
      correctAnswer: '',
    };
  }

  componentDidMount() {
    const { questionList } = this.props;
    if (questionList.length > 0) {
      this.getAnswers();
    }
  }

  getAnswers = () => {
    const { currQuestion } = this.state;
    const { questionList } = this.props;
    const answersArr = [];
    const savedAnswer = questionList[0].correct_answer;

    answersArr.push(
      questionList[currQuestion].correct_answer,
    );
    questionList[currQuestion].incorrect_answers.forEach((element) => {
      answersArr.push(element);
    });
    const reorder = 0.5;
    const reorderedArr = answersArr.sort(() => Math.random() - reorder);

    this.setState({
      currAnswers: reorderedArr,
      correctAnswer: savedAnswer,
    });
  };

  mapButtons = () => {
    const { currAnswers, correctAnswer } = this.state;
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
    const { currQuestion } = this.state;
    const { questionList } = this.props;
    return (
      <div>
        <Header />
        <h1>Game</h1>
        {
          questionList.length > 0
          && <div>
          <h1 name="category" data-testid="question-category">
            {questionList[currQuestion].category}
          </h1>
          <h3 name="text" data-testid="question-text">
            {questionList[currQuestion].question}
          </h3>
          <div id="respostas">
            { this.mapButtons() }
          </div>
        </div>
        }
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
});

export default connect(mapStateToProps)(Game);
