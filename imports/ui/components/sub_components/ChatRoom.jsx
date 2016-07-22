import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router'
import { logMessage } from '../../actions/actions'

import MessageForm from '../forms/MessageForm';

class ChatRoom extends Component {
  
  render() {
    
    let { currentUser, room, messageForm, submitHandler } = this.props

    return (
      <div className="column chat-room">
        <div className="row">
          <h1 className="chat-room-title">{ room.title }</h1>
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
          <span className="chat-room-username">{ currentUser.username }</span>
          <MessageForm onSubmit={submitHandler.bind(null, room._id, messageForm)} />
        </div>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (id, form) => {
      dispatch(logMessage(id, form.message.value));
    }
  }
}

export default connect(null, mapDispatchToProps)(ChatRoom);
