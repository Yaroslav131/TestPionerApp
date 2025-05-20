import {Dispatch} from 'redux';
import {
  FETCH_RACE_RESULTS_REQUEST,
  FETCH_RACE_RESULTS_SUCCESS,
  FETCH_RACE_RESULTS_FAILURE,
  RaceResultActionTypes,
} from './raceResultsTypes';
import {Race} from '@types/ergast';
import {fetchDriverRaceResults} from '../../api/ergast';

export const fetchRaceResultsRequest = (): RaceResultActionTypes => ({
  type: FETCH_RACE_RESULTS_REQUEST,
});

export const fetchRaceResultsSuccess = (
  results: Race[],
): RaceResultActionTypes => ({
  type: FETCH_RACE_RESULTS_SUCCESS,
  payload: results,
});

export const fetchRaceResultsFailure = (
  error: string,
): RaceResultActionTypes => ({
  type: FETCH_RACE_RESULTS_FAILURE,
  payload: error,
});

export const getDriverRaceResults = (driverId: string) => {
  return async (dispatch: Dispatch<RaceResultActionTypes>) => {
    dispatch(fetchRaceResultsRequest());
    try {
      const data = await fetchDriverRaceResults(driverId);
      dispatch(fetchRaceResultsSuccess(data.MRData.RaceTable.Races));
    } catch (error: any) {
      dispatch(
        fetchRaceResultsFailure(
          error.message || 'Failed to fetch race results',
        ),
      );
    }
  };
};
