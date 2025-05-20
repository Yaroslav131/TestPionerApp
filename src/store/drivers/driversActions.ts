import {Dispatch} from 'redux';
import {
  FETCH_DRIVERS_REQUEST,
  FETCH_DRIVERS_SUCCESS,
  FETCH_DRIVERS_FAILURE,
  SET_CURRENT_DRIVER,
  DriverActionTypes,
} from './driversTypes';
import {Driver} from '@types/ergast';
import {fetchDriverDetails, fetchDrivers} from '../../api/ergast';

export const fetchDriversRequest = (): DriverActionTypes => ({
  type: FETCH_DRIVERS_REQUEST,
});

export const fetchDriversSuccess = (
  drivers: Driver[],
  total: number,
  currentPage: number,
): DriverActionTypes => ({
  type: FETCH_DRIVERS_SUCCESS,
  payload: {drivers, total, currentPage},
});

export const fetchDriversFailure = (error: string): DriverActionTypes => ({
  type: FETCH_DRIVERS_FAILURE,
  payload: error,
});

export const setCurrentDriver = (driver: Driver | null): DriverActionTypes => ({
  type: SET_CURRENT_DRIVER,
  payload: driver,
});

export const getDrivers = (page: number, driversPerPage: number) => {
  return async (dispatch: Dispatch<DriverActionTypes>) => {
    console.log(
      `[getDrivers] Fetching drivers - Page: ${page}, PerPage: ${driversPerPage}`,
    );

    dispatch(fetchDriversRequest());
    try {
      const offset = page * driversPerPage;
      console.log(`[getDrivers] Calculated offset: ${offset}`);

      const data = await fetchDrivers(driversPerPage, offset);
      console.log('[getDrivers] API response:', data);

      const drivers = data.MRData.DriverTable.Drivers;
      const total = parseInt(data.MRData.total, 10);

      dispatch(fetchDriversSuccess(drivers, total, page));
      console.log(
        `[getDrivers] Dispatch success - Total: ${total}, Returned Drivers: ${drivers.length}`,
      );
    } catch (error: any) {
      console.error('[getDrivers] Error fetching drivers:', error);
      dispatch(fetchDriversFailure(error.message || 'Failed to fetch drivers'));
    }
  };
};

export const getDriverDetails = (driverId: string) => {
  return async (dispatch: Dispatch<DriverActionTypes>) => {
    dispatch(fetchDriversRequest());
    try {
      const data = await fetchDriverDetails(driverId);
      const driver = data.MRData.DriverTable.Drivers[0];
      dispatch(setCurrentDriver(driver));
    } catch (error: any) {
      dispatch(
        fetchDriversFailure(error.message || 'Failed to fetch driver details'),
      );
    }
  };
};
