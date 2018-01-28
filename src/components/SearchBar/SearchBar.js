import React from 'react';
import Button from '../UI/Button/Button';
import PropTypes from 'prop-types';
import './searchbar.css';

const SearchBar = props => {
  return (
    <div className='SearchBar'>
      <input className='SearchBar__input'
             type="text"
             value={props.inputValue}
             onChange={props.inputChanged}
             onKeyPress={props.inputOnKeyPress}/>
      <Button title='SEARCH' clicked={props.btnClicked}/>
    </div>
  );
};


SearchBar.propTypes = {
  searchText: PropTypes.string,
  inputChanged: PropTypes.func,
  btnClicked: PropTypes.func
};

export default SearchBar;
