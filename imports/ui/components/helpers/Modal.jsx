import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { toggleModal, getModalDimensions } from '../../actions/actions';

class Modal extends Component {
  
  render() {
    
    return (
      <div className="row">
        <button type="button"
              onClick={ this.props.toggleModal }>
          { this.props.buttonText }
        </button>
      { this.props.modalIsOpen ?
        <div className="modal"
             ref={ (div) => {
              if (div) {
                this.props.getModalDimensions({
                  pos: {
                    x: div.parentNode.offsetLeft,
                    y: div.offsetTop + div.parentNode.offsetTop
                  },
                  size: {
                    w: div.offsetWidth,
                    h: div.offsetHeight
                  }
                })
              }
            }}>
          {this.props.children}
        </div>
        :
        "" }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalIsOpen: state.ui.modal.isOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: (attrs) => dispatch(toggleModal(attrs)),
    getModalDimensions: (attrs) => dispatch(getModalDimensions(attrs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
