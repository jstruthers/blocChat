import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logMessage, clearForm } from '../actions/actions'
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router'

import MessageForm from './forms/MessageForm';

const ChatRoom = ({ user, icon, room, messageForm, submitHandler }) => {
  console.log(room.messageLog);
  return (
    <div className="column chat-room">
      <div className="row">
        <div className="chat-room-header">
          <h1 className="chat-room-title">{ room.title }</h1>
        </div>

        <div className="chat-room-occupant-list">
          { room.occupants
            ? room.occupants.map( (ocupant, i) => <p key={ `occupant_${i}` }>{ occupant.username }</p>)
            : ''
          }
        </div>
      </div>
      
      <div className="chat-room-message-box">
        { room.messageLog.map( (message, i) => <p key={ `message_${i}` }>{ message }</p> ) }
      </div>

      <div className="chat-room-input-field">
        <span className="chat-room-user-icon">{ icon }</span>
        <span className="chat-room-username">{ user.username }</span>
      </div>
      <MessageForm onSubmit={submitHandler.bind(null, room._id, messageForm)} />
    </div>
  )
}

ChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    messageForm: state.form.messageForm,
    userId: Meteor.userId(),
    user: Meteor.user()
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (id, form) => {
      dispatch(logMessage(id, form.text.value));
      dispatch(clearForm());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
