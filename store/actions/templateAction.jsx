
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';


export const toggleFavorite = (receivedInfo) => ({
  type: TOGGLE_FAVORITE,
  extraInfo: receivedInfo,
});

export const setFilters = (filtersSettings) => ({
  type: SET_FILTERS,
  filters: filtersSettings,
});
