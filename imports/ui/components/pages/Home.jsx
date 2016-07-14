import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import  { toggleModal, createChatRoom, logMessage, deleteChatRoom, getAllChatRooms, toggleSelectedChatRoom } from '../../actions/actions';

import ChatRoom from '../ChatRoom';
import CreateChatRoomForm from '../forms/CreateChatRoomForm';
import Modal from '../helpers/Modal';
import UserAccounts from './UserAccounts'

class Home extends Component {

  componentWillMount() {
    //this.props.subscribe('allchatRooms');
    this.props.getAllChatRooms();
  }

  handleChatRoomSelect(id) {
    this.props.chatRooms.map( chatRoom => {
      this.props.toggleSelectedChatRoom( chatRoom._id, false );
    });
    this.props.toggleSelectedChatRoom(id, true);
  }

  render(){
    let { deleteChatRoom,
          toggleModal,
          currentUser,
          chatRoomForm,
          submitHandler,
          serverError,
          chatRooms } = this.props;

    return (
      <div id="home" className="row">
        <div className="column menu">
          {serverError.error ? <div className="server-error">{serverError.error.reason}</div> : "" }

          <Modal buttonText="Create Chat Room" hasButton="true">
            <button type="button" className="close-btn">X</button>
            <CreateChatRoomForm onSubmit={submitHandler.bind(null, chatRoomForm)} />
          </Modal>

          <ul className="chat-room-list">
            { chatRooms.map((chatRoom, i ) => {

              return (
                <li className="chat-room-list-item" onClick={ this.handleChatRoomSelect.bind(this, chatRoom._id) } key={i}>
                  <span>{chatRoom.title}</span>
                  <button type="button" onClick={ deleteChatRoom.bind(null, chatRoom._id) }>
                    X
                  </button>
                  <div/>
                </li>)
            })}
          </ul>

        </div>
        { chatRooms.filter( chatRoom => chatRoom.isSelected )
            .map( (selectedRoom, i) => 
                 <ChatRoom
                   key={ `selectedRoom${i}` }
                   icon={ ':)' }
                   room={ selectedRoom }
                  /> ) }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    currentUser: state.ui.currentUser,
    chatRooms: state.chatRooms,
    chatRoomForm: state.form.createChatRoomForm
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(createChatRoom(form.title.value));
      dispatch(toggleModal(false));
    },
    getAllChatRooms: () => {
      dispatch(getAllChatRooms())
    },
    deleteChatRoom: (id) => {
      dispatch(deleteChatRoom(id))
    },
    toggleSelectedChatRoom: (id, bool) => {
      dispatch(toggleSelectedChatRoom(id, bool))
    },
    toggleModal: (option) => {
      dispatch(toggleModal(option))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
