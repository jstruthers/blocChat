import { combineReducers } from 'redux';
import ui from './uiReducer';
import chatRooms from './chatRoomsReducer';
import serverError from './serverErrorReducer';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  ui,
  chatRooms,
  serverError,
  routing: routerReducer,
  form: formReducer.plugin({
    messageForm: (state, action) => {
      switch(action.type) {
        case 'CLEAR_FORM':
          console.log(state, action);
          return {...state, text: undefined};
        default:
          return state;
      }
    }
  })
})

export default rootReducer;
