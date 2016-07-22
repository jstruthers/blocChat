import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Meteor } from 'meteor/meteor'
import { setCurrentUser } from '../../actions/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Modal from '../helpers/Modal'
import SubscribeComponent from '../helpers/SubscribeComponent'
import ChatRoom from '../sub_components/ChatRoom'
import Menu from '../sub_components/Menu'
import CreateChatRoomForm from '../forms/CreateChatRoomForm'

class Home extends Component {
  
  componentWillMount() {
    if (!this.props.currentUser) {
      browserHistory.push('/userAccounts')
    }
  }
  
  componentWillUpdate(nextProps) {
    if (!nextProps.currentUser) {
      this.props.dispatch(setCurrentUser())
      browserHistory.push('/userAccounts')
    }
  }
  
  componentDidMount() {
    this.props.subscribe('allChatRooms')
  }

  render(){
    let { chatRoomForm,
          messageForm,
          serverError,
          chatRooms,
          selectedRoom,
          currentUser } = this.props

    return (
      <div id="home" className="column">

        {serverError.error
           ? (<div className="server-error-message row">
               {serverError.error.reason}
             </div>)
           : <div className="server-error-empty row" />
        }
        
        <div className="row">
          <Menu currentUser={ currentUser }
                chatRooms={ chatRooms }
                chatRoomForm={ chatRoomForm }
                currentUser={ currentUser }
          />

          <ReactCSSTransitionGroup component="div"
                                   className="row"
                                   transitionName="chat-room-display"
                                   transitionEnterTimeout={500}
                                   transitionLeaveTimeout={300}>
            { chatRooms.filter( chatRoom => chatRoom.isSelected )
                .map( (selectedRoom, i) => 
                   <ChatRoom
                     key={ `selectedRoom${i}` }
                     currentUser={ currentUser }
                     room={ selectedRoom }
                     messageForm={ messageForm }
                    /> )
            }
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    serverError: state.serverError,
    chatRooms: state.chatRooms,
    selectedRoom: state.ui.selectedRoom,
    chatRoomForm: state.form.createChatRoomForm,
    messageForm: state.form.messageForm,
    currentUser: Meteor.user()
  }
}

export default connect(mapStateToProps)(SubscribeComponent(Home));
