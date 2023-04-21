import { handleActions } from 'redux-actions';

import actions from '../actions/app';

export const name = 'theme_app';

export const initialState = {
    customAddressData: null,
    isFullPageLoading: false
};

export const reducerMap = {
    [actions.setDataDirectories]: (state, { payload }) => {
        return {
            ...state,
            customAddressData: payload
        };
    },
    [actions.setFullPageLoading]: (state, { payload }) => {
        return {
            ...state,
            isFullPageLoading: payload
        };
    }
};

export default handleActions(reducerMap, initialState);
