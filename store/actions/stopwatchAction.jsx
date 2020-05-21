
export const START_TIMER = 'START_TIMER';
export const SET_FILTERS = 'SET_FILTERS';


export const startTimer = (startTimerState) => ({
  type: START_TIMER,
  newState: startTimerState,
});

export const setFilters = (filtersSettings) => ({
  type: SET_FILTERS,
  filters: filtersSettings,
});
