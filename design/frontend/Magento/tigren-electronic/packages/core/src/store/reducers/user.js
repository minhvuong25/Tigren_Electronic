import { handleActions } from 'redux-actions';

import { Util } from '@magento/peregrine/lib/index';
import actions from '../actions/user';

const { BrowserPersistence } = Util;

const storage = new BrowserPersistence();

export const name = 'user';

const isSignedIn = () => !!storage.getItem('signin_token');

export const initialState = {
    currentUser: {
        email: '',
        firstname: '',
        lastname: '',
        is_subscribed: false,
        date_of_birth: '',
        taxvat: '',
        gender: '',
        addresses: []
    },
    change_email: false,
    isPopupOrderDetailsOpen: false,
    change_password: false,
    getDetailsError: null,
    isGettingDetails: false,
    isResettingPassword: false,
    isSignedIn: isSignedIn(),
    resetPasswordError: null,
    token: storage.getItem('signin_token'),
    recentViewed: null
};

export const reducerMap = {
    [actions.setToken]: (state, { payload }) => {
        return {
            ...state,
            isSignedIn: true,
            token: payload
        };
    },
    [actions.clearToken]: state => {
        return {
            ...state,
            isSignedIn: false,
            token: null
        };
    },
    [actions.getDetails.request]: state => {
        return {
            ...state,
            getDetailsError: null,
            isGettingDetails: true
        };
    },
    [actions.getDetails.receive]: (state, { payload, error }) => {
        if (error) {
            return {
                ...state,
                getDetailsError: payload,
                isGettingDetails: false
            };
        }

        return {
            ...state,
            currentUser: payload,
            getDetailsError: null,
            isGettingDetails: false
        };
    },
    [actions.resetPassword.request]: state => ({
        ...state,
        isResettingPassword: true
    }),
    // TODO: handle the reset password response from the API.
    [actions.resetPassword.receive]: (state, { payload, error }) => {
        if (error) {
            return {
                ...state,
                isResettingPassword: false,
                resetPasswordError: payload
            };
        }

        return {
            ...state,
            isResettingPassword: false,
            resetPasswordError: null
        };
    },
    [actions.reset]: () => {
        return {
            ...initialState,
            isSignedIn: false,
            token: null
        };
    },
    [actions.viewOrder]: (state, { payload }) => {
        return {
            ...state,
            isPopupOrderDetailsOpen: payload
        };
    },
    [actions.editAccount]: (state, { payload }) => {
        if (payload) {
            if (typeof payload.change_email != 'undefined') {
                return {
                    ...state,
                    change_email: payload.change_email
                };
            }
            if (typeof payload.change_password != 'undefined') {
                return {
                    ...state,
                    change_password: payload.change_password
                };
            }
        } else {
            return {
                ...state,
                change_email: null,
                change_password: null
            };
        }
    },
    [actions.clearRecentViewed]: state => {
        return {
            ...state,
            recentViewed: null,
            isSignedIn: false,
            token: null
        };
    }
};

export default handleActions(reducerMap, initialState);
