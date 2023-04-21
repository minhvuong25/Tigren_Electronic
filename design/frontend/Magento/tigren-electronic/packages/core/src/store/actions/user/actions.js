import { createActions } from 'redux-actions';

const prefix = 'USER';

const actionTypes = [
    'RESET',
    'SET_TOKEN',
    'CLEAR_TOKEN',
    'EDIT_ACCOUNT',
    'VIEW_ORDER',
    'CLEAR_RECENT_VIEWED'
];

const actionMap = {
    SIGN_IN: {
        REQUEST: null,
        RECEIVE: null
    },
    GET_DETAILS: {
        REQUEST: null,
        RECEIVE: null
    },
    CREATE_ACCOUNT: {
        REQUEST: null,
        RECEIVE: null
    },
    RESET_PASSWORD: {
        REQUEST: null,
        RECEIVE: null
    },
    UPDATE_CUSTOMER: {
        REQUEST: null,
        RECEIVE: null
    },
    UPDATE_PASSWORD: {
        REQUEST: null,
        RECEIVE: null
    },
    UPDATE_ADDRESS: {
        REQUEST: null,
        RECEIVE: null
    },
    DELETE_ADDRESS: {
        REQUEST: null,
        RECEIVE: null
    }
};

export default createActions(actionMap, ...actionTypes, { prefix });
