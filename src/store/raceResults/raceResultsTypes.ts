import {Race} from '../../types/ergast';

export const FETCH_RACE_RESULTS_REQUEST = 'FETCH_RACE_RESULTS_REQUEST';
export const FETCH_RACE_RESULTS_SUCCESS = 'FETCH_RACE_RESULTS_SUCCESS';
export const FETCH_RACE_RESULTS_FAILURE = 'FETCH_RACE_RESULTS_FAILURE';

export interface RaceResultState {
  results: Race[];
  loading: boolean;
  error: string | null;
}

interface FetchRaceResultsRequestAction {
  type: typeof FETCH_RACE_RESULTS_REQUEST;
}

interface FetchRaceResultsSuccessAction {
  type: typeof FETCH_RACE_RESULTS_SUCCESS;
  payload: Race[];
}

interface FetchRaceResultsFailureAction {
  type: typeof FETCH_RACE_RESULTS_FAILURE;
  payload: string;
}

export type RaceResultActionTypes =
  | FetchRaceResultsRequestAction
  | FetchRaceResultsSuccessAction
  | FetchRaceResultsFailureAction;
