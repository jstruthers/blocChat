import { callMethodPromise } from '../../helpers/helperPromises';

import { Meteor } from 'meteor/meteor';

////////////////////////////////////////
//  CHAT ROOMS                        //
////////////////////////////////////////

export function createChatRoom(name){
  return dispatch => {
    callMethodPromise('createChatRoom', name)
      .then(data => dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
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

export function clearForm(){
  return {
    type: 'CLEAR_FORM'
  }
}

export function getAllChatRooms(){
  return dispatch => {
    callMethodPromise('getAllChatRooms')
      .then(ChatRooms => dispatch(setChatRooms(ChatRooms)))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error
        });
      })
  }
}

export function logMessage(id, text){
  return dispatch => {
    callMethodPromise('logMessage', id, text)
      .then(data => dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error
        });
      })
  }
}

export function toggleSelectedChatRoom(id, bool){
  return dispatch => {
    callMethodPromise('toggleSelectedChatRoom', id, bool)
      .then(data => dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error
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
