const ChatRooms = new Mongo.Collection('chatRooms');

if(Meteor.isServer){
  // require()...
  // server only requires here (import doesn't work inside if statement)
}

export function createChatRoom(text) {
  return ChatRooms.insert({
    text
  })
}


export default ChatRooms;
