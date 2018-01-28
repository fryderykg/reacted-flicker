import React, {Component, Fragment} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './modal.css';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show
      || nextProps.children !== this.props.children
    )
  }

  render() {
    const className = ['Modal'];

    if (this.props.show) {
      className.push('show');
    }

    return (
      <Fragment>
        <Backdrop show={this.props.show} closeBackdrop={this.props.closeSummary}/>
        <div className={className.join(' ')}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
