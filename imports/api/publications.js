import ChatRooms from './collections/chatRooms';

Meteor.publish('allChatRooms', function() {
  return ChatRooms.find({});
});
