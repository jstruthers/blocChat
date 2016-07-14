import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { connect } from 'react-redux';
import  { toggleModal, getCurrentUser } from '../../actions/actions';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  
  modalHandler(dispatch, event) {

    let m = this.props.modal,
        leftBound = m.pos.x,
        rightBound = m.pos.x + m.size.w,
        topBound = m.pos.y,
        bottomBound = m.pos.y + m.size.h;
    if (!((event.clientX <= rightBound) && (event.clientX >= leftBound)
        && (event.clientY <= bottomBound) && (event.clientY >= topBound))
        && this.props.currentUser) {
      dispatch(toggleModal(false));
    }
  }
  
  componentDidMount() {
    this.props.dispatch(getCurrentUser());
  }
  
  render() {

    let { dispatch, modalIsOpen, currentUser, children } = this.props;
    
    return (
      <div>
        <main className="main-container"
              onClick={
                modalIsOpen
                  ? this.modalHandler.bind(this, dispatch)
                  : null }>
          <div className={ modalIsOpen ? 'dim' : ''} />
          <Header currentUser={ currentUser } />
            { children }
          <Footer />
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modal: state.ui.modal,
    currentUser: state.ui.currentUser,
    modalIsOpen: state.ui.modal.isOpen
  }
}

export default connect(mapStateToProps)(Main)
