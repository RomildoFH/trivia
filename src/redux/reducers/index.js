import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import questions from './questions';
import answers from './answers';

const rootReducer = combineReducers({ player, token, questions, answers });

export default rootReducer;
