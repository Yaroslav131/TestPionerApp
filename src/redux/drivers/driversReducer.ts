import {
  DriverState,
  DriverActionTypes,
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  SET_CURRENT_DRIVER,
} from './driversTypes';

const initialState: DriverState = {
  drivers: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalDrivers: 0,
  driversPerPage: 10,
  currentDriver: null,
};

export const driversReducer = (
  state = initialState,
  action: DriverActionTypes,
): DriverState => {
  switch (action.type) {
    case FETCH_DRIVERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DRIVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        drivers: action.payload.drivers,
        totalDrivers: action.payload.total,
        currentPage: action.payload.currentPage,
        error: null,
      };
    case FETCH_DRIVERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_CURRENT_DRIVER:
      return {
        ...state,
        currentDriver: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
