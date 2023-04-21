import React, { createContext, useContext } from 'react';
import { useGoogleTagManagerSettings } from './talons/useGoogleTagManagerSettings';

const GoogleTagManagerContext = createContext(undefined);
const { Provider } = GoogleTagManagerContext;

const GoogleTagManagerContextProvider = props => {
    const { children } = props;

    const contextValue = useGoogleTagManagerSettings();
    const { error } = contextValue;

    if (error) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }

    return <Provider value={contextValue}>{children}</Provider>;
};

export default GoogleTagManagerContextProvider;

export const useGoogleTagManagerContext = () =>
    useContext(GoogleTagManagerContext);
