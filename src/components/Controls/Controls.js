import React from 'react';
import Button from '../UI/Button/Button';
import './controls.css'

const Controls = props => {

  return (
    <div className='Controls'>
      <div className='Controls__info'>
        Internet was invented for watching?
      </div>
      <div className='Controls__buttons'>
        <Button title='DOGS' clicked={() => props.onChangeSpecies('dog')}/>
        <Button title='CATS' clicked={() => props.onChangeSpecies('cat')}/>
      </div>
    </div>
  );
};

export default Controls;
