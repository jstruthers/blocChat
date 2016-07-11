import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import ChatRooms from '../../../api/collections/chatRooms';
import CreateChatRoomForm from '../CreateChatRoomForm';
import Modal from '../helpers/Modal';
import  { toggleModal, createChatRoom, deleteChatRoom, getAllChatRooms } from '../../actions/actions';

class Home extends Component {
  componentWillMount() {
    //this.props.subscribe('allchatRooms');
    this.props.getAllChatRooms();
  }
  render(){
    
    let { deleteChatRoom, toggleModal, form, submitHandler, serverError, chatRooms } = this.props;

    return (
      <div className="home">
        <div className="notifier">
          {serverError.error ? <div className="server-error">{serverError.error.reason}</div> : "" }
          <ul>
            {chatRooms.map((chatRoom, i ) => {
              return (<li key={i}>
                <button type="button" onClick={ deleteChatRoom.bind(null, chatRoom._id) }>
                  X
                </button>
                {chatRoom.text}
              </li>)
            })}
          </ul>
          <div className={ this.props.modalIsOpen ? 'dim' : ''} />
          <Modal buttonText="Click to create a Chat Room">
            <button type="button" className="closeBtn">X</button>
            <CreateChatRoomForm onSubmit={submitHandler.bind(null, form)} />
          </Modal>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    chatRooms: state.chatRooms,
    form: state.form.createChatRoomForm,
    modalIsOpen: state.ui.modal.isOpen
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(createChatRoom(form.text.value.toLowerCase()));
      dispatch(toggleModal(false))
    },
    getAllChatRooms: () => {
      dispatch(getAllChatRooms())
    },
    deleteChatRoom: (id) => {
      dispatch(deleteChatRoom(id))
    },
    toggleModal: (option) => {
      dispatch(toggleModal(option))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
