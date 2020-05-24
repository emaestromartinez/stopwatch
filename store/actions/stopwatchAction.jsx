
export const START_TIMER = 'START_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const UPDATE_TIMER = 'UPDATE_TIMER';

export const SET_FILTERS = 'SET_FILTERS';

export const startTimer = (startTimerState) => ({
  type: START_TIMER,
  newState: startTimerState,
});
export const pauseTimer = (pauseTimerState) => ({
  type: PAUSE_TIMER,
  newState: pauseTimerState,
});
export const stopTimer = (stopTimerState) => ({
  type: STOP_TIMER,
  newState: stopTimerState,
});
export const updateTimer = (updatedTime) => ({
  type: UPDATE_TIMER,
  newState: updatedTime,
});

export const setFilters = (filtersSettings) => ({
  type: SET_FILTERS,
  filters: filtersSettings,
});
