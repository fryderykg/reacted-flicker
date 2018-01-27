import React from 'react';
import PropTypes from 'prop-types';
import Photo from './Photo/Photo';

import './photos.css';

const Photos = props => {
  return (
    <div className='Photos'>
      <Photo/>
      <Photo/>
      <Photo/>
    </div>
  );
};

Photos.propTypes = {
  photos: PropTypes.array
};

export default Photos;
