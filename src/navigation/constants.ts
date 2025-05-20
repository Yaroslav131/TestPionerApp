import {RootStackParamList} from './types';

export const SCREENS: Record<
  keyof RootStackParamList,
  keyof RootStackParamList
> = {
  DriverList: 'DriverList',
  DriverDetails: 'DriverDetails',
};

export const SCREEN_TITLES: Record<keyof RootStackParamList, string> = {
  DriverList: 'F1 Drivers',
  DriverDetails: 'Driver Details',
};
