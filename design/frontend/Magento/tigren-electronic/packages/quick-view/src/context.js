import React, { createContext, useCallback, useContext, useState } from 'react';

const TgQuickViewContext = createContext({});
const { Provider } = TgQuickViewContext;

const useQuickView = () => {
    const [showedSku, setShowedSku] = useState(null);

    const showQuickView = useCallback(sku => {
        setShowedSku(sku);
    }, []);

    return {
        showedSku,
        showQuickView
    };
};

const TgQuickViewProvider = props => {
    const { children } = props;

    const talonProps = useQuickView();

    const contextValue = {
        ...talonProps
    };

    return <Provider value={contextValue}>{children}</Provider>;
};

export default TgQuickViewProvider;

export const useTgQuickViewContext = () => useContext(TgQuickViewContext);
