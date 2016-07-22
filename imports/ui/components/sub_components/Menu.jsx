import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import {
  createChatRoom,
  toggleModal,
  getAllChatRooms
} from '../../actions/actions'

import Modal from '../helpers/Modal'
import ChatRoomListItem from './ChatRoomListItem'
import CreateChatRoomForm from '../forms/CreateChatRoomForm'

class Menu extends Component {
  
  componentDidMount() {
    this.props.getAllChatRooms()
  }
  
  render() {
    
    let { currentUser, chatRooms, chatRoomForm, deleteChatRoom, submitHandler } = this.props

    return (
      <div className="column">
        <div className="chat-room-list">

          <h3 className="chat-room-list-header">Chat Room List</h3>

          <ReactCSSTransitionGroup component="ul"
                                   transitionName="chat-room-add-remove"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            { chatRooms.map((chatRoom, i ) => {
              return (
                <ChatRoomListItem chatRoom={ chatRoom }
                                  chatRooms={ chatRooms }
                                  currentUser={ currentUser }
                />
              )
            })}
          </ReactCSSTransitionGroup>

          <Modal buttonText="Create Chat Room"
                 hasButton="true">
            <button type="button"
                    className="close-btn-modal">X</button>
            <CreateChatRoomForm onSubmit={submitHandler.bind(null, chatRoomForm)} />
          </Modal>

        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitHandler: (form) => {
      dispatch(createChatRoom(form.title.value));
      dispatch(toggleModal(false));
    },
    getAllChatRooms: () => {
      dispatch(getAllChatRooms())
    }
  }
}

export default connect(null, mapDispatchToProps)(Menu)
