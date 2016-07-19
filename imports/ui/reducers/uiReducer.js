function uiReducer(state = [], action = {}){
  
  let newState = state;
  
  switch (action.type) {
    case 'TOGGLE_MODAL':

      if (action.option) {
        newState.modal.isOpen = action.option;
      } else {
        newState.modal.isOpen = state.modal.isOpen ? false : true;
      }

      return {...newState, ...state};
    
    case 'GET_MODAL_DIMENSIONS':
      
      newState.modal.pos = action.pos;
      newState.modal.size = action.size;
      
      return {...newState, ...state}
    
    case 'SET_CURRENT_USER':
      
      newState.currentUser = action.currentUser[0];
      
      return {...newState, ...state};

    default:
      return state;
  }
}

export default uiReducer;
