import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { toggleModal, getModalDimensions } from '../../actions/actions';

class Modal extends Component {
  
  componentWillMount() {
    if (!this.props.hasButton) {
      this.props.toggleModal('true');
    }
  }
  
  getPosition(el) {
    let x = 0, y = 0;
 
    while (el) {
      if (el.tagName == "BODY") {
        let xScroll = el.scrollLeft || document.documentElement.scrollLeft,
            yScroll = el.scrollTop || document.documentElement.scrollTop;

        x += (el.offsetLeft - xScroll + el.clientLeft);
        y += (el.offsetTop - yScroll + el.clientTop);
      } else {
        x += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        y += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return { x, y };
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
                 style={ this.props.hasButton ? { marginLeft: '20px' } : {}}
                 ref={ (div) => {
                  if (div) {
                    let pos = this.getPosition(div)
                    if (!this.props.modalAttrs) {
                      this.props.getModalDimensions({
                        pos,
                        size: {
                          w: div.offsetWidth,
                          h: div.offsetHeight
                        }
                      })
                    } else if (
                      this.props.modalAttrs.x !== pos.x
                      && this.props.modalAttrs.y !== pos.y) {
                      this.props.getModalDimensions({
                        pos,
                        size: {
                          w: div.offsetWidth,
                          h: div.offsetHeight
                        }
                      })
                    }
                  }
                }}>
              { this.props.children }
            </div>
            :
            "" }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    modalIsOpen: state.ui.modal.isOpen,
    modalAttrs: state.ui.modal.pos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: (opt) => dispatch(toggleModal(opt)),
    getModalDimensions: (attrs) => dispatch(getModalDimensions(attrs))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
