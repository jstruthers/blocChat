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
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not logged in', 'You must log in to create a chat room');
    }

    return createChatRoom(title, [], [], false, Meteor.user());
  },
  deleteChatRoom(id){
    if (this.isSimulation) {
      //server only method returns out on client
      return false;
    }
    if (!id){
      throw new Meteor.Error('id missing', 'Chat Room is undefined');
    }
    console.log(ChatRooms.findOne(id).createdBy._id)
    if (Meteor.userId() !== ChatRooms.findOne(id).createdBy._id) {
      throw new Meteor.Error('Not permitted', "You can only delete the chat rooms you created!");
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
    if (!Meteor.userId()) {
      throw new Meteor.Error('No author', 'You must be signed in to write a message');
    }

    return logMessage(id, text, Meteor.user(), new Date());
  },
  getCurrentUser() {
    return Meteor.user();
  }
  // Specify user permissions here, not
});
