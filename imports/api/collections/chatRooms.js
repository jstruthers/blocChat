const ChatRooms = new Mongo.Collection('chatRooms');

if(Meteor.isServer){
  // require()...
  // server only requires here (import doesn't work inside if statement)
}

export function createChatRoom(title, messageLog, occupants, isSelected, createdBy) {
  return ChatRooms.insert({
    title,
    messageLog,
    occupants,
    isSelected,
    createdBy
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

export function logMessage(id, text, author, timestamp) {
  return ChatRooms.update( id, {
    $push: { messageLog: { text, author: author.username, date: timestamp }}
  });
}

export default ChatRooms;
