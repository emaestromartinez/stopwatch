
export const CHANGE_THEME = 'CHANGE_THEME';

export const SET_FILTERS = 'SET_FILTERS';

export const changeTheme = (newTheme) => ({
  type: CHANGE_THEME,
  newTheme,
});


export const setFilters = (filtersSettings) => ({
  type: SET_FILTERS,
  filters: filtersSettings,
});
