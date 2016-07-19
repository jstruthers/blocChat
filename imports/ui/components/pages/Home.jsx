import React, { Component } from 'react'
import { connect } from 'react-redux';
import  { toggleModal, createChatRoom, deleteChatRoom, getAllChatRooms, toggleSelectedChatRoom } from '../../actions/actions';

import ChatRoom from '../ChatRoom';
import CreateChatRoomForm from '../forms/CreateChatRoomForm';
import Modal from '../helpers/Modal';

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
          chatRoomForm,
          submitHandler,
          serverError,
          chatRooms,
          currentUser } = this.props;

    return (
      <div id="home" className="column">

        {serverError.error ? <div className="error">{serverError.error.reason}</div> : "" }

        <div className="menu row">
          <div className="chat-room-list column">
           
            <h3 className="chat-room-list-title">Chat Room List</h3>

            <ul>
              { chatRooms.map((chatRoom, i ) => {
                console.log(currentUser);
                return (
                  <li className="chat-room-list-item" onClick={ this.handleChatRoomSelect.bind(this, chatRoom._id) } key={i}>
                    <span>{chatRoom.title}</span>
                    { chatRoom.createdBy._id === currentUser._id
                        ? (<button type="button" onClick={ deleteChatRoom.bind(null, chatRoom._id) }>
                             X
                           </button>)
                        : ""
                    }
                    <div/>
                  </li>)
              })}
            </ul>
            
            <Modal buttonText="Create Chat Room" hasButton="true">
              <button type="button" className="close-btn">X</button>
              <CreateChatRoomForm onSubmit={submitHandler.bind(null, chatRoomForm)} />
            </Modal>

          </div>

          { chatRooms.filter( chatRoom => chatRoom.isSelected )
              .map( (selectedRoom, i) => 
                   <ChatRoom
                     key={ `selectedRoom${i}` }
                     room={ selectedRoom }
                    /> ) }
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    chatRooms: state.chatRooms,
    chatRoomForm: state.form.createChatRoomForm,
    currentUser: state.ui.currentUser
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
