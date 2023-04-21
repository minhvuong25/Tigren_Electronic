import React, { createContext, useContext } from 'react';
import { useCompare } from './talons';

const CompareContext = createContext();
const { Provider } = CompareContext;

const CompareProvider = props => {
    const { children } = props;

    const talonProps = useCompare();

    return <Provider value={talonProps}>{children}</Provider>;
};

export default CompareProvider;

export const useCompareContext = () => useContext(CompareContext);
