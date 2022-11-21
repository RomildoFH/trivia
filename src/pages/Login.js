import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { actionLogin, fetchToken, resetScore } from '../redux/actions';
import '../styles/Login.css';
import '../images/logo trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.dataValidation());
  };

  dataValidation = () => {
    const { email, name } = this.state;

    let emailValidation = false;

    // the email validation was found at:
    // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex)) {
      emailValidation = true;
    } else {
      emailValidation = false;
    }

    const minLength = 1;
    const nameValidation = name.length >= minLength;

    const validation = (emailValidation && nameValidation);

    this.setState({
      isDisabled: !validation,
    });

    return validation;
  };

  fetchTokenFun = async () => {
    const { name, email } = this.state;
    const { dispatch } = this.props;
    await dispatch(fetchToken());
    await dispatch(actionLogin(name, email));
  };

  handleClick = async () => {
    const { history } = this.props;
    await this.fetchTokenFun();
    history.push('/game');
  };

  render() {
    const { isDisabled, email, name } = this.state;
    const { dispatch } = this.props;
    dispatch(resetScore());
    return (
      <div>
        <div className="logo-container" />
        <form>
          <input
            name="email"
            type="text"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            value={ email }
            placeholder="Informe um e-mail válido"
          />
          <input
            name="name"
            type="text"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            value={ name }
            placeholder="Seu nome"
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <Link to="/setting">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Setting
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  assertions: globalState.player.assertions,
  score: globalState.player.score,
  gravatarEmail: globalState.player.gravatarEmail,
  token: globalState.token.token,
});

export default connect(mapStateToProps)(Login);
