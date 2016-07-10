import { combineReducers } from 'redux';
import chatRooms from './chatRoomsReducer';
import serverError from './serverErrorReducer';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  chatRooms,
  serverError,
  routing: routerReducer,
  form: formReducer
})

export default rootReducer;
