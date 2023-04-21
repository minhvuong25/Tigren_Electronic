import { createActions } from 'redux-actions';

const prefix = 'APP';

const actionTypes = ['SET_DATA_DIRECTORIES', 'SET_FULL_PAGE_LOADING'];

const actionMap = {};

export default createActions(actionMap, ...actionTypes, { prefix });
