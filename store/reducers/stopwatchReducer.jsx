import { START_TIMER, SET_FILTERS } from '../actions/stopwatchAction';

const initialState = {
  eventDate: undefined,
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
};

const stopwatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return action.newState;

    case SET_FILTERS:
      return state;

    default:
      return state;
  }
};

export default stopwatchReducer;
