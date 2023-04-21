import React, { createContext, useCallback, useContext, useState } from 'react';

const SuccessPopup = createContext({});
const { Provider } = SuccessPopup;

const useSuccessPopup = () => {
    const [item, setItem] = useState(null);

    const toggleSuccessPopup = useCallback(item => {
        setItem(item);
    }, []);

    return {
        item,
        toggleSuccessPopup
    };
};

const SuccessPopupProvider = props => {
    const { children } = props;

    const talonProps = useSuccessPopup();

    const contextValue = {
        ...talonProps
    };

    return <Provider value={contextValue}>{children}</Provider>;
};

export default SuccessPopupProvider;

export const useSuccessPopupContext = () => useContext(SuccessPopup);
