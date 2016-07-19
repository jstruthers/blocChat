import { applyMiddleware, createStore, compose } from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

//redux middleware
import ChatRooms from './api/collections/chatRooms';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from './ui/reducers/rootReducer';

const logger = createLogger();
const middleware = [reduxThunk, logger];

let storeState = {
  ui: {
    modal: {
      isOpen: false
    }
  }
}

const store = createStore(rootReducer, storeState, applyMiddleware(...middleware));

Tracker.autorun(() => {
  store.dispatch({
    type: 'SET_CHAT_ROOMS',
    chatRooms: ChatRooms.find().fetch(),
  });
  store.dispatch({
    type: 'SET_CURRENT_USER',
    currentUser: Meteor.users.find().fetch()
  })
});

export default store;

export const history = syncHistoryWithStore(browserHistory, store);
