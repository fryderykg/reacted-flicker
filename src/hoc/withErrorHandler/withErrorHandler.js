import React, {Component, Fragment} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request
      });

      this.resInterceptor = axios.interceptors.response.use(
        res => {
          if(res.data.stat === 'fail') {
            console.log('data fetching failed');
            this.setState({error: res.data.message});
            return null
          } else {
            return res
          }
        },
        error => {
        this.setState({error: error});
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    };

    render() {
      return (
        <Fragment>
          <Modal show={this.state.error}
                 closeSummary={this.errorConfirmedHandler}>
            {this.state.error}
          </Modal>
          <WrappedComponent {...this.props}/>
        </Fragment>
      );
    }
  }
};

export default withErrorHandler;
