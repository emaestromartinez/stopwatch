import {
  CHANGE_THEME,
  SET_FILTERS,
} from '../actions/themeAction';

const initialState = {
  // theme: 'default',
  theme: 'light',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, ...action.newTheme };

    case SET_FILTERS:
      return state;

    default:
      return state;
  }
};

export default themeReducer;
