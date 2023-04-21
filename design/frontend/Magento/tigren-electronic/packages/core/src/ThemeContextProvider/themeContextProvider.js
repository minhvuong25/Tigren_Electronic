import React from 'react';

import AppContextProvider from '../context/app';
import UserContextProvider from '../context/user';

/**
 * List of essential context providers that are required to run Peregrine
 *
 * @property {React.Component[]} contextProviders
 */
const contextProviders = [AppContextProvider, UserContextProvider];

const ThemeContextProvider = ({ children }) => {
    return contextProviders.reduceRight((memo, ContextProvider) => {
        return <ContextProvider>{memo}</ContextProvider>;
    }, children);
};

export default ThemeContextProvider;
