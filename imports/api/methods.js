import ChatRooms, { createChatRoom, deleteChatRoom } from './collections/chatRooms';

Meteor.methods({
  createChatRoom(text){
    if (this.isSimulation) {
      //server only method returns out on client
      return false;
    }
    if (!text){
      throw new Meteor.Error('name missing', 'Cannot submit an empty message');
    }

    return createChatRoom(text);
  },
  deleteChatRoom(id){
    if (this.isSimulation) {
      //server only method returns out on client
      return false;
    }
    if (!id){
      throw new Meteor.Error('id missing', 'Chat Room is undefined');
    }

    return deleteChatRoom(id);
  },
  getAllChatRooms(){
    if (this.isSimulation) {
      return false;
    }
    return ChatRooms.find().fetch()
  }
});
