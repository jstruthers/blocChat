import { applyMiddleware, createStore, compose } from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import { Tracker } from 'meteor/tracker';

//redux middleware
import ChatRooms from './api/collections/chatRooms';
import createLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from './ui/reducers/rootReducer';

const logger = createLogger();
const middleware = [reduxThunk, logger];

const store = createStore(rootReducer, {}, applyMiddleware(...middleware));

Tracker.autorun(() => {
  store.dispatch({
    type: 'SET_CHAT_ROOMS',
    chatRooms: ChatRooms.find().fetch(),
  });
});

export default store;

export const history = syncHistoryWithStore(browserHistory, store);
