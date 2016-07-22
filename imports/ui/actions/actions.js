import { callMethodPromise } from '../../helpers/helperPromises';

import { Meteor } from 'meteor/meteor';

////////////////////////////////////////
//  CHAT ROOMS                        //
////////////////////////////////////////

export function createChatRoom(title){
  return dispatch => {
    callMethodPromise('createChatRoom', title)
      .then(data => dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
          label: 'createChatRoom'
        });
      });
  };
};

export function deleteChatRoom(id){
  return dispatch => {
    callMethodPromise('deleteChatRoom', id)
      .then(data => dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
          label: 'deleteChatRoom'
        });
      });
  };
};

export function setChatRooms(chatRooms){
  return {
    type: 'SET_CHAT_ROOMS',
    chatRooms
  }
}

export function clearForm(fields) {
  return {
    type: 'CLEAR_FORM',
    fields
  }
}

export function getAllChatRooms(){
  return dispatch => {
    callMethodPromise('getAllChatRooms')
      .then(ChatRooms => dispatch(setChatRooms(ChatRooms)))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
          label: 'getAllChatRooms'
        });
      })
  }
}

export function logMessage(id, message){
  let fields = {};
  fields.message = null;
  return dispatch => {
    callMethodPromise('logMessage', id, message)
      .then(data => dispatch(getAllChatRooms()))
      .then(() => dispatch(clearForm(fields)))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
          label: 'logMessage'
        });
      })
  }
}

export function updateSelectedRoom () {
  return {
    type: 'UPDATE_SELECTED_ROOM'
  }
}

export function toggleSelectedChatRoom(id, bool){
  return dispatch => {
    callMethodPromise('toggleSelectedChatRoom', id, bool)
      .then(() => dispatch(updateSelectedRoom()))
      .then(data => dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
          label: 'toggleSelectedChatRoom'
        });
      })
  }
}

////////////////////////////////////////
//  UI                                //
////////////////////////////////////////

export function toggleModal(opt) {
  return {
    type: 'TOGGLE_MODAL',
    opt
  }
}

export function getModalDimensions({pos, size}) {
  return {
    type: 'GET_MODAL_DIMENSIONS',
    pos,
    size
  }
}

export function setCurrentUser() {
  return {
    type: 'SET_CURRENT_USER',
    currentUser: Meteor.users.find().fetch()
  }
}
