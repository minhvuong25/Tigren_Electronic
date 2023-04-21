import { combineReducers, createStore } from 'redux';
import { enhancer, reducers } from '@magento/peregrine';

import themeReducers from '@tigrensolutions/core/src/store/reducers';

// This is the connective layer between the Peregrine store and the
// venia-concept UI. You can add your own reducers/enhancers here and combine
// them with the Peregrine exports.
//
// example:
// const rootReducer = combineReducers({ ...reducers, ...myReducers });
// const rootEnhancer = composeEnhancers(enhancer, myEnhancer);
// export default createStore(rootReducer, rootEnhancer);

// You can add your own reducers here and combine them with the Peregrine exports.
const rootReducer = combineReducers({ ...reducers, ...themeReducers });

export default createStore(rootReducer, enhancer);
