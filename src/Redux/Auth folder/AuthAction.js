import {
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  GET_USER_DATA,
  GET_USER_ADDRESSES,
  GET_USER_CART,
  GET_USER_ORDERHISTORY,
  DEFAULT_ADDRESS,
} from './AuthActionTypes';

export const userLogInAction = authDataResponse => ({
  type: AUTH_LOG_IN,
  authDataResponse,
});
export const userLogOutAction = authDataResponse => ({
  type: AUTH_LOG_OUT,
  authDataResponse,
});

export const getUserProfile = authDataResponse => ({
  type: GET_USER_DATA,
  authDataResponse,
});
export const getUserAddresses = authDataResponse => ({
  type: GET_USER_ADDRESSES,
  authDataResponse,
});
export const getUserCart = authDataResponse => ({
  type: GET_USER_CART,
  authDataResponse,
});
export const getUserOrderHistory = authDataResponse => ({
  type: GET_USER_ORDERHISTORY,
  authDataResponse,
});
export const defaultUserAddress = authDataResponse => ({
  type: DEFAULT_ADDRESS,
  authDataResponse,
});
