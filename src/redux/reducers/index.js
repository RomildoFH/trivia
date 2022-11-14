import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';
import timer from './timer';

const rootReducer = combineReducers({ player, token, questions, timer });
export default rootReducer;
