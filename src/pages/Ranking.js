import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Ranking.css';
// import mockRanking from '../components/helpers/mockRanking';

class Ranking extends React.Component {
  componentDidMount() {
    // mockando localStorage para criar componentes:
    // localStorage.setItem('ranking', JSON.stringify(mockRanking));
  }

  render() {
    // const newArray = mockRanking.sort((a, b) => b.score - a.score);
    // localStorage.setItem('ranking', JSON.stringify(newArray));
    const newArray2 = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <div className="logo-container" />
        <div className="ranking-box">
          <h1 data-testid="ranking-title">Ranking</h1>
          <div>
            {
              newArray2.map((user, index) => (
                <div className="usr-score-container" key={ index }>
                  <div className="pfp-name">
                    <img
                      src={ user.gravatarEmail }
                      alt={ `gravatar-${user.name}` }
                      className="profile-img"
                    />
                    <h3 data-testid={ `player-name-${index}` }>{ user.name }</h3>
                    <div className="score">
                      <div className="star-container" />
                      <h4 data-testid={ `player-score-${index}` }>
                        Score:
                        {' '}
                        { user.score }
                      </h4>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <Link to="/">
            <button
              type="button"
              className="ranking-button"
              data-testid="btn-go-home"
            >
              Home
            </button>
          </Link>
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
