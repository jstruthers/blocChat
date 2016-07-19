export function logInPlugin(state, action) {
  switch(action.type) {
    case 'CLEAR_FORM':
      let newState = {};

      for (let field in action.fields) {
        if (state.hasOwnProperty(field)) {
          newState[field] = {
            ...state[field], 
            value: undefined
          };
        }
      }
      
      return {...state, ...newState}

    default:
      return state
  }
}

export function createNewUserPlugin(state, action) {
  switch(action.type) {
    case 'CLEAR_FORM':
      let newState = {};

      for (let field in action.fields) {
        if (state.hasOwnProperty(field)) {
          newState[field] = {
            ...state[field], 
            value: undefined
          };
        }
      }

      return {...state, ...newState}

    default:
      return state
  }
}

export function messagePlugin(state, action) {
  switch(action.type) {
    case 'CLEAR_FORM':
      let newState = {};

      for (let field in action.fields) {
        if (state.hasOwnProperty(field)) {
          newState[field] = {
            ...state[field], 
            value: undefined
          };
        }
      }

      return {...state, ...newState}

    default:
      return state
  }
}