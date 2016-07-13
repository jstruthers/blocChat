import ChatRooms, { createChatRoom, deleteChatRoom, toggleSelectedChatRoom, logMessage } from './collections/chatRooms';

Meteor.methods({
  createChatRoom(title) {
    if (this.isSimulation) {
      //server only method returns out on client
      return false;
    }
    if (!title) {
      throw new Meteor.Error('name missing', 'Cannot create an untitled room');
    }

    return createChatRoom(title, [], [], false);
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
  },
  toggleSelectedChatRoom(id, bool) {
    if (this.isSimulation) {
      return false
    }
    if (!id){
      throw new Meteor.Error('id missing', 'Cannot toggle selected without ChatRoom id');
    } else if (bool === undefined) {
      throw new Meteor.Error('boolean argument missing', 'Requires true or false as the second argument');
    }
    return toggleSelectedChatRoom(id, bool);
  },
  logMessage(id, text) {
    if (this.isSimulation) {
      //server only method returns out on client
      return false;
    }
    if (!text) {
      throw new Meteor.Error('text missing', 'Cannot submit an empty message');
    }

    return logMessage(id, text);
  }
});
