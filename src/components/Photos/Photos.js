import React from 'react';
import Photo from './Photo/Photo';
import PropTypes from 'prop-types';
import './photos.css';

const Photos = props => {

  const photos = props.photos.photo.map(photo => {
    return (
      <Photo key={photo.id}
             farm={photo.farm}
             server={photo.server}
             secret={photo.secret}
             id={photo.id}
             title={photo.title}
             author={photo.owner}/>
    )
  });

  return (
    <div className="Photos">
      {photos}
    </div>
  );
};


Photos.propTypes = {
  photos: PropTypes.object
};

export default Photos;
