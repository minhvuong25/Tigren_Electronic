import React from 'react';
import {
    PeregrineContextProvider as Peregrine,
    ToastContextProvider,
    WindowSizeContextProvider
} from '@magento/peregrine';
import LocaleProvider from './localeProvider';
import { ThemeContextProvider } from '@tigrensolutions/core/src/ThemeContextProvider';

/**
 * List of context providers that are required to run @tigrensolutions/core
 *
 * @property {React.Component[]} contextProviders
 */
const contextProviders = [
    LocaleProvider,
    Peregrine,
    WindowSizeContextProvider,
    ToastContextProvider,
    ThemeContextProvider
];

const ContextProvider = ({ children }) => {
    return contextProviders.reduceRight((memo, ContextProvider) => {
        return <ContextProvider>{memo}</ContextProvider>;
    }, children);
};

export default ContextProvider;
