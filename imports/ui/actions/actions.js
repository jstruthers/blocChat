import { callMethodPromise } from '../../helpers/helperPromises';

import { Meteor } from 'meteor/meteor';

////////////////////////////////////////
//  CHAT ROOMS                        //
////////////////////////////////////////

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

export function deleteChatRoom(id){
  return dispatch => {
    callMethodPromise('deleteChatRoom', id)
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
