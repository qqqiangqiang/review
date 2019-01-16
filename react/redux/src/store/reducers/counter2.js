const initState = {
  value: 0
}

export default function(state, action) {
  switch(action.type) {
    case 'add_counter2':
      return { value: ++state.value};
      break;
    case 'reduce_counter2':
      return { value: --state.value } 
      break;
    default: 
      return initState;
  }
}