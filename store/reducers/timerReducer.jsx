import {
  START_TIMER,
  PAUSE_TIMER,
  RESUME_TIMER,
  UPDATE_TIMER,
  STOP_TIMER,
  SET_FILTERS,
} from '../actions/timerAction';

const initialState = {
  eventDate: undefined,
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
  isTimerRunning: false,
  isTimerPaused: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TIMER:
      return { ...state, ...action.newState };

    case PAUSE_TIMER:
      return { ...state, ...action.newState };

    case RESUME_TIMER:
      return { ...state, ...action.newState };

    case STOP_TIMER:
      return { ...state, ...action.newState };

    case UPDATE_TIMER:
      return { ...state, ...action.newState };

    case SET_FILTERS:
      return state;

    default:
      return state;
  }
};

export default timerReducer;
