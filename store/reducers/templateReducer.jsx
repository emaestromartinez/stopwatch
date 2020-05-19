import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/templateAction';

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      break;

    case SET_FILTERS:
      break;

    default:
      return state;
  }
};

export default templateReducer;
