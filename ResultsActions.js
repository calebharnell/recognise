import { ADD_RESULTS } from './types';

export const addResults = resultsArray => (
  {
    type: ADD_RESULTS,
    payload: resultsArray,
  }
);