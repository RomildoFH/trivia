import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <div>
        <img src={ url } alt="gravatar" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{ name }</h3>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
