import { callMethodPromise } from '../../helpers/helperPromises';

import { Meteor } from 'meteor/meteor';

export function createChatRoom(text){
  return dispatch => {
    callMethodPromise('createChatRoom', text)
      .then(data=> dispatch(getAllChatRooms()))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error,
        });
      });
  };
};

export function setChatRooms(ChatRooms){
  return {
    type: 'SET_CHAT_ROOMS',
    ChatRooms
  }
}

export function getAllChatRooms(){
  return dispatch => {
    callMethodPromise('getAllChatRooms')
      .then(ChatRooms=> dispatch(setChatRooms(ChatRooms)))
      .catch(error=>{
        dispatch({
          type: 'SERVER_ERROR',
          error
        });
      })
  }
}