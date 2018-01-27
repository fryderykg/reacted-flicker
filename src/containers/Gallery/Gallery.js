import React, {Component} from 'react';
import axios from 'axios';
import Photos from '../../components/Photos/Photos';
import './gallery.css';

class Gallery extends Component {

  KEY = '9292fc3d2a1f09a6e56f7d40f7170cb6';

  state = {
    photos: []
  };

  componentWillMount() {
    const URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=9292fc3d2a1f09a6e56f7d40f7170cb6';
    const PER_PAGE = 10;
    const TEXT = 'dog';
    const UPDATED_URL = URL + '&text=' + TEXT + '&per_page=' + PER_PAGE + '&format=json&nojsoncallback=1';
    console.log(UPDATED_URL);
    axios.get(UPDATED_URL)
      .then(response => {
        console.log(response);
        this.setState({
          photos: response.data.photos
        })

      })
      .catch(error => {
        console.log(error)
      });
  }

  render() {
    return (
      <div className='Gallery'>
        <Photos photos={this.state.photos}/>
      </div>
    );
  }
}

export default Gallery;
