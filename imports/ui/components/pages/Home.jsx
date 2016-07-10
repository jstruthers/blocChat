import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';

import ChatRooms from '../../../api/collections/chatRooms';
import CreateChatRoomForm from '../CreateChatRoomForm';
import  { createChatRoom, getAllChatRooms } from '../../actions/actions';

class Home extends Component {
  componentWillMount() {
    //this.props.subscribe('allchatRooms');
    console.log(this.props);
    this.props.getAllChatRooms();
  }
  render(){
    let { form, submitHandler, serverError, chatRooms } = this.props;
    return (
      <div className="home">
        <div className="notifier">
          {serverError.error ? <div className="server-error">{serverError.error.reason}</div> : "" }
          <ul>
            {chatRooms.map((chatRoom, i )=> <li key={i}>{chatRoom.text}</li>)}
          </ul>
        </div>
        <CreateChatRoomForm onSubmit={submitHandler.bind(null, form)} />
      </div>
    )
  }
}


function mapStateToProps(state){
  console.log(state.chatRooms);
  return {
    serverError: state.serverError,
    chatRooms: state.chatRooms,
    form: state.form.createChatRoomForm
  }
}

function mapDispatchToProps(dispatch){
  return {
    submitHandler: (form) => {
      dispatch(createChatRoom(form.text.value.toLowerCase()))
    },
    getAllChatRooms: () => {
      dispatch(getAllChatRooms())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
