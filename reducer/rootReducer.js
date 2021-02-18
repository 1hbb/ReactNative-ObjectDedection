import {combineReducers} from 'redux';
import mainReducer from './mainReducer';
const rootReducer = combineReducers({
  mainData: mainReducer,
});

export default rootReducer;
