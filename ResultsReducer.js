import { ADD_RESULTS } from './types';

import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
};

const resultsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_RESULTS:
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      // const { current, previous } = state;
      // Pull friend out of friends.possible
      // Note that action.payload === friendIndex
      const current = action.payload

      // Finally, update our redux state
      const newState = { current };
      return newState;
    default:
      return state
  }
};

export default combineReducers({
  results: resultsReducer,
});