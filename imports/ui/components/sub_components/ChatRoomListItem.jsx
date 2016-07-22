import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteChatRoom, toggleSelectedChatRoom } from '../../actions/actions'

class ChatRoomListItem extends Component {
  
  handleChatRoomSelect(id) {
    this.props.chatRooms.map( chatRoom => {
      this.props.toggleSelectedChatRoom( chatRoom._id, false );
    });
    this.props.toggleSelectedChatRoom(id, true);
  }
  
  render() {
    
    let { chatRooms, chatRoom, currentUser, deleteChatRoom } = this.props
    
    return (
      <li className="chat-room-list-item row"
          style={{ justifyContent: 'space-between' }}
          onClick={ this.handleChatRoomSelect.bind(this, chatRoom._id) }>
        <span className={
            chatRoom.isSelected
              ? "chat-room-list-item-title-selected"
              : "chat-room-list-item-title" }>
          { chatRoom.title }
        </span>
        <span className="chat-room-list-item-author column">
          { `created by ${chatRoom.createdBy.username}` }
        </span>
        { chatRoom.createdBy._id === currentUser._id
            ? (<button className="close-btn"
                       type="button"
                       onClick={ deleteChatRoom.bind(null, chatRoom._id) }>
                 X
               </button>)
            : ""
        }
      </li>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteChatRoom: (id) => {
      dispatch(deleteChatRoom(id))
    },
    toggleSelectedChatRoom: (id, bool) => {
      dispatch(toggleSelectedChatRoom(id, bool))
    }
  }
}

export default connect(null, mapDispatchToProps)(ChatRoomListItem)
