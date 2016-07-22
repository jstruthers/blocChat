import { combineReducers } from 'redux';
import ui from './uiReducer';
import chatRooms from './chatRoomsReducer';
import serverError from './serverErrorReducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { logInPlugin, createNewUserPlugin, messagePlugin } from '../components/forms/plugins';

const rootReducer = combineReducers({
  ui,
  chatRooms,
  serverError,
  routing: routerReducer,
  form: formReducer.plugin({
    logInForm: logInPlugin,
    createNewUserForm: createNewUserPlugin,
    messageForm: messagePlugin
  })
});

export default rootReducer;
