import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { toggleModal, getModalDimensions } from '../../actions/actions';

class Modal extends Component {
  
  componentWillMount() {
    if (!this.props.hasButton) {
      this.props.toggleModal('true');
    }
    console.log('in modal', this.props.modalIsOpen, this.props.hasButton)
  }
  
  render() {
    
    return (
      <div className="row">
        { this.props.hasButton
            ? (<button type="button"
                className="modal-btn"
                onClick={ this.props.toggleModal }>
                { this.props.buttonText
                    ? this.props.buttonText
                    : ''}
              </button>)
            : ""
        }
        
      { this.props.modalIsOpen
          ? <div className="modal"
                 ref={ (div) => {
                  if (div) {
                    this.props.getModalDimensions({
                      pos: {
                        x: div.offsetParent.offsetLeft,
                        y: div.offsetParent.offsetTop
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
    toggleModal: (opt) => dispatch(toggleModal(opt)),
    getModalDimensions: (attrs) => dispatch(getModalDimensions(attrs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
