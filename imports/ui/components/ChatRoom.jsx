import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logMessage } from '../actions/actions'
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router'

import MessageForm from './forms/MessageForm';

const ChatRoom = ({ user, room, messageForm, submitHandler }) => {

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
        { room.messageLog.map( (message, i) => {
            return (
              <div key={ `message_${i}` }
                   className="row chat-room-message">
                <div className="column">
                  <p className="row chat-room-message-text">{ message.text }</p>
                  <p className="row chat-room-message-info">
                    <i><span className="chat-room-message-author">
                      - { message.author }
                    </span>
                    <span className="chat-room-message-time">
                        { message.date.toLocaleTimeString() }
                    </span>
                    <span className="chat-room-message-date">
                      { message.date.toLocaleDateString() }
                    </span></i>
                  </p>
                </div>
              </div>)
          })
        }
      </div>

      <div className="chat-room-input-field">
        <span className="chat-room-username">{ user.username }</span>
        <MessageForm onSubmit={submitHandler.bind(null, room._id, messageForm)} />
      </div>

    </div>
  )
}

ChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired
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
      dispatch(logMessage(id, form.message.value));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
