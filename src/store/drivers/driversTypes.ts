import {Driver} from '@types/ergast';

export const FETCH_DRIVERS_REQUEST = 'FETCH_DRIVERS_REQUEST';
export const FETCH_DRIVERS_SUCCESS = 'FETCH_DRIVERS_SUCCESS';
export const FETCH_DRIVERS_FAILURE = 'FETCH_DRIVERS_FAILURE';
export const SET_CURRENT_DRIVER = 'SET_CURRENT_DRIVER';

export interface DriverState {
  drivers: Driver[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalDrivers: number;
  driversPerPage: number;
  currentDriver: Driver | null;
}

interface FetchDriversRequestAction {
  type: typeof FETCH_DRIVERS_REQUEST;
}

interface FetchDriversSuccessAction {
  type: typeof FETCH_DRIVERS_SUCCESS;
  payload: {
    drivers: Driver[];
    total: number;
    currentPage: number;
  };
}

interface FetchDriversFailureAction {
  type: typeof FETCH_DRIVERS_FAILURE;
  payload: string;
}

interface SetCurrentDriverAction {
  type: typeof SET_CURRENT_DRIVER;
  payload: Driver | null;
}

export type DriverActionTypes =
  | FetchDriversRequestAction
  | FetchDriversSuccessAction
  | FetchDriversFailureAction
  | SetCurrentDriverAction;
