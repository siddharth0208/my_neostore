import {authReducer} from './Auth folder/AuthReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
