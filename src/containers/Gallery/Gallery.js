import React, {Component} from 'react';
import axios from 'axios';
import Photos from '../../components/Photos/Photos';
import './gallery.css';

class Gallery extends Component {

  state = {
    photos: null
  };

  componentWillMount() {
    const URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
    const KEY = '9292fc3d2a1f09a6e56f7d40f7170cb6';
    const PER_PAGE = 10;
    const TEXT = 'dogs';
    const UPDATED_URL = URL + '&api_key=' + KEY + '&text=' + TEXT + '&per_page=' + PER_PAGE + '&format=json&nojsoncallback=1';
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
    let photos = null;

    if (this.state.photos) {
      photos = <Photos photos={this.state.photos}/>
    }

    return (
      <div className='Gallery'>
        {photos}
      </div>
    );
  }
}

export default Gallery;
