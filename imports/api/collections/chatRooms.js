const ChatRooms = new Mongo.Collection('chatRooms');

if(Meteor.isServer){
  // require()...
  // server only requires here (import doesn't work inside if statement)
}

export function createChatRoom(title, messageLog, occupants, isSelected) {
  return ChatRooms.insert({
    title,
    messageLog,
    occupants,
    isSelected
  })
}

export function deleteChatRoom(id) {
  return ChatRooms.remove({
    _id: id
  })
}

export function toggleSelectedChatRoom(id, bool) {
  return ChatRooms.update( id, {
    $set: { isSelected: bool }
  });
}

export function logMessage(id, text) {
  return ChatRooms.update( id, {
    $push: { messageLog: text }
  });
}

export default ChatRooms;
