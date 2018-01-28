import React, {Component} from 'react';
import axios from 'axios';
import Photos from '../../components/Photos/Photos';
import Loader from '../../components/UI/Loader/Loader';
import Controls from '../../components/Controls/Controls';
import SearchBar from '../../components/SearchBar/SearchBar'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import './gallery.css';

class Gallery extends Component {

  URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
  KEY = '9292fc3d2a1f09a6e56f7d40f7170cb6';

  state = {
    currentPage: 1,
    endOfPhotos: false,
    fetchingInProgress: false,
    noPhotosOfCurrentParams: false,
    perPage: 100,
    photos: [],
    searchText: '',
    speciesSelected: false,
    tags: '',
    text: ''
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
      const UPDATED_URL = this.URL + '&api_key=' + this.KEY + '&text=' + this.state.text + '&tags=' + this.state.tags
        + '&per_page=' + this.state.perPage + '&page=' + this.state.currentPage
        + '&sort=relevance&format=json&nojsoncallback=1';

      axios.get(UPDATED_URL)
        .then(response => {
          if (response) {
            if(response.data.photos.photo.length === 0) {
              this.setState({
                noPhotosOfCurrentParams: true
              });
            } else {
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
            // Reach end of photos
            if(response.data.photos.page === response.data.photos.pages) {
              this.setState({
                endOfPhotos: true
              })
            }
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

    if (scrolledToBottom && !this.state.endOfPhotos) {
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

  onInputChangedHandler = (e) => {
    this.setState({
      searchText: e.target.value,
      tags: e.target.value.split(' ').join(',')
    });
  };

  inputOnKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      this.fetchingNewData()
    }
  };

  onSearchHandler = () => {
    this.fetchingNewData();
  };

  fetchingNewData = () => {
    this.setState({
      photos: [],
      currentPage: 1,
      endOfPhotos: false
    });
    setTimeout(() => {this.fetchData()}, 100);
  };

  render() {
    let photos = null;
    let loader = null;
    let search = null;
    let errorInfo = null;

    if (this.state.photos.length > 0 && this.state.speciesSelected) {
      photos = <Photos photos={this.state.photos}/>
    }

    if(this.state.noPhotosOfCurrentParams) {
      errorInfo = <div className='Gallery__errorInfo'>no photos of current search criteria</div>
    } else if (this.state.endOfPhotos) {
      errorInfo = <div className='Gallery__errorInfo'>no more photos</div>
    }



    if (this.state.speciesSelected) {
      search = <SearchBar inputChanged={this.onInputChangedHandler}
                          inputOnKeyPress={this.inputOnKeyPressHandler}
                          inputValue={this.state.searchText}
                          btnClicked={this.onSearchHandler}/>
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
        {search}
        {photos}
        {errorInfo}
        {loader}
      </div>
    );
  }
}

export default withErrorHandler(Gallery, axios);
