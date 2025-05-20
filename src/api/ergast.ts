import axios from 'axios';
import {ErgastDriverResponse, ErgastRaceResultsResponse} from '@types/ergast';

const API_BASE_URL = 'http://ergast.com/api/f1';
const REQUEST_TIMEOUT = 10000;

const ergastApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

const logError = (context: string, error: unknown): void => {
  console.error(`Error in ${context}:`, error);
};

const fetchFromErgast = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await ergastApi.get<T>(endpoint);
    return response.data;
  } catch (error) {
    logError(`fetchFromErgast ${endpoint}`, error);
    throw error;
  }
};

export const fetchDrivers = async (
  limit: number,
  offset: number,
): Promise<ErgastDriverResponse> => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });
  return fetchFromErgast<ErgastDriverResponse>(
    `/drivers.json?${params.toString()}`,
  );
};

export const fetchDriverDetails = async (
  driverId: string,
): Promise<ErgastDriverResponse> => {
  return fetchFromErgast<ErgastDriverResponse>(`/drivers/${driverId}.json`);
};

export const fetchDriverRaceResults = async (
  driverId: string,
): Promise<ErgastRaceResultsResponse> => {
  return fetchFromErgast<ErgastRaceResultsResponse>(
    `/drivers/${driverId}/results.json?limit=1000`,
  );
};
