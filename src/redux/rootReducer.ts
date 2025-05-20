import {combineReducers} from 'redux';
import {driversReducer} from './drivers/driversReducer';
import {raceResultsReducer} from './raceResults/raceResultsReducer';

const rootReducer = combineReducers({
  drivers: driversReducer,
  raceResults: raceResultsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
