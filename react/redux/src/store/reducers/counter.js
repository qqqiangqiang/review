const initState = {
  value: 0
}

export default function(state = initState, action) {
  switch(action.type) {
    case 'add':
      return { value: ++state.value};
      break;
    case 'reduce':
      return { value: --state.value } 
      break;
    default: 
      return initState;
  }
}