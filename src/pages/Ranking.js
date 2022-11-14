import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import mockRanking from '../components/helpers/mockRanking';

class Ranking extends React.Component {
  componentDidMount() {
    // mockando localStorage para criar componentes:
    // localStorage.setItem('ranking', JSON.stringify(mockRanking));
  }

  render() {
    localStorage.setItem('ranking', JSON.stringify(mockRanking));
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));
    const newArray = rankingArray.sort((a, b) => b.score - a.score);
    return (
      <div>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {
            newArray.map((user, index) => (
              <div key={ index }>
                <img src={ user.gravatar } alt={ `gravatar-${user.nome}` } />
                <h3 data-testid={ `player-name-${index}` }>{ user.nome }</h3>
                <h4 data-testid={ `player-score-${index}` }>
                  Score:
                  {' '}
                  { user.score }
                </h4>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  name: globalState.name,
  assertions: globalState.assertions,
  score: globalState.score,
  gravatarEmail: globalState.gravatarEmail,
  token: globalState.token,
});

export default connect(mapStateToProps)(Ranking);