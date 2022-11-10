import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Button extends React.Component {
  render() {
    const { testid, label } = this.props;
    return (
      <button type="button" data-testid={ testid }>
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  questionList: globalState.questionList,
});

export default connect(mapStateToProps)(Button);
