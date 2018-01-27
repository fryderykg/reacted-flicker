import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './photo.css';
import axios from "axios/index";
import Loader from '../../components/UI/Loader/Loader';

class Photo extends Component {
  SRC = 'https://farm' + this.props.farm + '.staticflickr.com/' + this.props.server + '/' + this.props.id + '_' + this.props.secret + '.jpg';

  state = {
    imageLoaded: false,
    allDataLoaded: false,
    author: null,
    date: null
  };

  componentWillMount() {
    this.lazyLoadPhoto(this.SRC);
    const URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo';
    const KEY = '9292fc3d2a1f09a6e56f7d40f7170cb6';
    const PHOTO_ID = this.props.id;
    const SECRET = this.props.secret;
    const UPDATED_URL = URL + '&api_key=' + KEY + '&photo_id=' + PHOTO_ID + '&secret=' + SECRET + '&format=json&nojsoncallback=1';
    axios.get(UPDATED_URL)
      .then(response => {
        this.setState({
          allDataLoaded: true,
          author: response.data.photo.owner.username,
          date: response.data.photo.dates.taken
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  lazyLoadPhoto = (url) => {
    const image = new Image();

    image.src = url;
    image.onload = () => {
      this.setState({
        imageLoaded: true
      })
    }
  };

  render () {
    let image = <Loader/>;

    if (this.state.imageLoaded) {
      image = (
        <img src={this.SRC} alt="" className='Photo__img'/>
      );
    }

    let photo = (
      <div className='Photo'>
        <div className='Photo__imgWrapper'/>
        <div className='Photo__caption'/>
        <Loader/>
      </div>
    );

    if (this.state.allDataLoaded) {
      photo = (
        <div className='Photo'>
          <div className='Photo__imgWrapper'>
            {image}
          </div>
          <div className='Photo__caption'>
            <div className='Photo__title'>{this.props.title}</div>
            <div className='Photo__author'>by {this.state.author}</div>
            <div className='Photo__date'>on {this.state.date}</div>
          </div>
        </div>
      )
    }

    return photo
  }
}

Photo.propTypes = {
  id: PropTypes.string,
  secret: PropTypes.string,
  title: PropTypes.string
};

export default Photo;
