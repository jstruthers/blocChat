import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { connect } from 'react-redux';
import  { toggleModal } from '../../actions/actions';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  
  modalHandler(dispatch, event) {

    let m = this.props.modal,
        leftBound = m.pos.x,
        rightBound = m.pos.x + m.size.w,
        topBound = m.pos.y,
        bottomBound = m.pos.y + m.size.h;
    
    if (!((event.clientX <= rightBound) && (event.clientX >= leftBound)
        && (event.clientY <= bottomBound) && (event.clientY >= topBound))) {
      dispatch(toggleModal(false));
    }
  }
  
  render(){

    return (
      <div>
      <div className={ this.props.modalIsOpen ? 'dim' : ''} />
      <main className="main-container"
            onClick={ 
              this.props.modalIsOpen
                ? this.modalHandler.bind(this, this.props.dispatch)
                : null }>
          <Header />
            {this.props.children}
          <Footer />
      </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modal: state.ui.modal,
    modalIsOpen: state.ui.modal.isOpen
  }
}

export default connect(mapStateToProps)(Main)
