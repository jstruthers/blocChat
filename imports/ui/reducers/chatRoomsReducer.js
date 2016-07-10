function chatRoomsReducer(state = [], action = {}){
  switch (action.type) {
    case 'SET_CHAT_ROOMS':
      return action.chatRooms ? action.chatRooms : state;
    default:
      return state;
  }
}

export default chatRoomsReducer;