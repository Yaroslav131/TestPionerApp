import {
  RaceResultState,
  RaceResultActionTypes,
  FETCH_RACE_RESULTS_REQUEST,
  FETCH_RACE_RESULTS_SUCCESS,
  FETCH_RACE_RESULTS_FAILURE,
} from './raceResultsTypes';

const initialState: RaceResultState = {
  results: [],
  loading: false,
  error: null,
};

export const raceResultsReducer = (
  state = initialState,
  action: RaceResultActionTypes,
): RaceResultState => {
  switch (action.type) {
    case FETCH_RACE_RESULTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RACE_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload,
        error: null,
      };
    case FETCH_RACE_RESULTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
