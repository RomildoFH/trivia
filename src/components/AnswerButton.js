import React from 'react';
import PropTypes from 'prop-types';

class Answerbutton extends React.Component {
  render() {
    const {
      id,
      testid,
      buttonName,
      handleResponse,
      borderStyle,
      response,
      disabled,
      handleScore,
    } = this.props;
    const border = response ? borderStyle : '1px solid black';
    return (
      <button
        id={ id }
        type="button"
        data-testid={ testid }
        style={ { border } }
        onClick={ (e) => { handleResponse(); handleScore(e); } }
        disabled={ disabled }
      >
        { buttonName }
      </button>
    );
  }
}

Answerbutton.propTypes = {
  id: PropTypes.string,
  testid: PropTypes.string,
  buttonName: PropTypes.string,
}.isRequired;

export default Answerbutton;
