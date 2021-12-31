import {
  AUTH_LOG_IN,
  AUTH_LOG_OUT,
  GET_USER_DATA,
  GET_USER_ADDRESSES,
  GET_USER_CART,
  GET_USER_ORDERHISTORY,
} from './AuthActionTypes';

const initialState = {
  isLoading: true,
  authData: null,
  getUserData: [],
  getUserAddresses: [],
  getUserCart: [],
  userOrderHistory: [],
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOG_IN:
      return {
        ...state,
        authData: action.authDataResponse,
      };

    case AUTH_LOG_OUT:
      return {
        ...state,
        authData: action.authDataResponse,
      };

    case GET_USER_DATA:
      return {
        ...state,
        getUserData: action.authDataResponse,
      };

    case GET_USER_ADDRESSES:
      return {
        ...state,
        getUserAddresses: action.authDataResponse,
      };

    case GET_USER_CART:
      return {
        ...state,
        getUserCart: action.authDataResponse,
      };
    case GET_USER_ORDERHISTORY:
      return {
        ...state,
        userOrderHistory: action.authDataResponse,
      };
    default:
      return state;
  }
};
