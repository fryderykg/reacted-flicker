import React from 'react';
import PropTypes from 'prop-types';
import './photo.css';

const Photo = props => {
  return (
    <div className='Photo'>
      <img src={props.src} alt='' className='Photo__img'/>
      <p className='Photo__title'>{props.title}</p>
      <p className='Photo__author'>{props.author}</p>
    </div>
  );
};

Photo.propTypes = {
  
};

export default Photo;
