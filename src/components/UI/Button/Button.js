import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

const Button = props => {
  return (
    <button className='Button' onClick={props.clicked}>
      {props.title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string
};

export default Button;
