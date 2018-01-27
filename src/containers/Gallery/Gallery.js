import React, {Component} from 'react';
import axios from 'axios';
import Photos from '../../components/Photos/Photos';
import Loader from '../../components/UI/Loader/Loader';
import './gallery.css';

class Gallery extends Component {

  URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
  KEY = '9292fc3d2a1f09a6e56f7d40f7170cb6';
  TEXT = 'dogs';

  state = {
    photos: [],
    fetchingInProgress: false,
    currentPage: 1,
    perPage: 10
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
    this.fetchData();
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  };

  fetchData = () => {
    console.log('before fetch')
    if (!this.state.fetchingInProgress) {
      this.setState({
        fetchingInProgress: true
      });
      console.log('fetch data', this.state.currentPage);
      const UPDATED_URL = this.URL + '&api_key=' + this.KEY + '&text=' + this.TEXT
        + '&per_page=' + this.state.perPage + '&page=' + this.state.currentPage
        + '&sort=relevance&format=json&nojsoncallback=1';

      axios.get(UPDATED_URL)
        .then(response => {
          const updatedPhotos = this.state.photos.concat(response.data.photos.photo);

          this.setState({
            photos: updatedPhotos,
            currentPage: this.state.currentPage + 1,
            fetchingInProgress: false
          })
        })
        .catch(error => {
          console.log(error)
        });
    }
  };


  handleOnScroll = ()  => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.fetchData();
    }
  };

  render() {
    let photos = null;
    let loader = null;

    if (this.state.photos.length > 0) {
      photos = <Photos photos={this.state.photos}/>
    }

    if(this.state.fetchingInProgress) {
      loader = (
        <div className='Gallery__loader'>
          <Loader/>
        </div>
        )
    }

    return (
      <div className='Gallery'>
        {photos}
        {loader}
      </div>
    );
  }
}

export default Gallery;
