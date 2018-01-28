import React, {Component} from 'react';
import axios from 'axios';
import Photos from '../../components/Photos/Photos';
import Loader from '../../components/UI/Loader/Loader';
import Controls from '../../components/Controls/Controls';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import './gallery.css';

class Gallery extends Component {

  URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
  KEY = '9292fc3d2a1f09a6e56f7d40f7170cb6';

  state = {
    photos: [],
    fetchingInProgress: false,
    currentPage: 1,
    perPage: 10,
    text: 'cat',
    speciesSelected: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);

  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  };

  fetchData = () => {
    if (!this.state.fetchingInProgress) {
      this.setState({
        fetchingInProgress: true
      });
      const UPDATED_URL = this.URL + '&api_key=' + this.KEY + '&ext=' + this.state.text
        + '&per_page=' + this.state.perPage + '&page=' + this.state.currentPage
        + '&sort=relevance&format=json&nojsoncallback=1';

      axios.get(UPDATED_URL)
        .then(response => {
          if (response) {
            const photosWithKey = response.data.photos.photo.map(el => {
              return {
                ...el,
                key: Date.now() + el.id
              }
            });

            const updatedPhotos = this.state.photos.concat(photosWithKey);
            this.setState({
              photos: updatedPhotos,
              currentPage: this.state.currentPage + 1,
              fetchingInProgress: false
            })
          }
          this.setState({
            fetchingInProgress: false
          });
        })
        .catch(error => {
          console.log(error)
        });
    }
  };

  // Initialize Fetching Date when scroll to the bottom
  handleOnScroll = ()  => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.fetchData();
    }
  };

  onChangeSpeciesHandler = (species) => {
    this.setState({
      photos: [],
      text: species,
      currentPage: 1,
      speciesSelected: true
    });
    setTimeout(() => {this.fetchData()}, 100);
  };

  render() {
    let photos = null;
    let loader = null;

    if (this.state.photos.length > 0 && this.state.speciesSelected) {
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
        <Controls onChangeSpecies={this.onChangeSpeciesHandler}/>
        {photos}
        {loader}
      </div>
    );
  }
}

export default withErrorHandler(Gallery, axios);
