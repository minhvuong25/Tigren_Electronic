import React, { createContext, useContext, useState } from 'react';

const ProductSwatchContext = createContext([]);
const { Provider } = ProductSwatchContext;

const useProductSwatch = () => {
    const [filterState, setFilterState] = useState(new Map());

    return {
        filterState,
        setFilterState
    };
};

const ProductSwatchProvider = props => {
    const { children } = props;

    const talonProps = useProductSwatch();

    const contextValue = {
        ...talonProps
    };

    return <Provider value={contextValue}>{children}</Provider>;
};

export default ProductSwatchProvider;

export const useProductSwatchContext = () => useContext(ProductSwatchContext);
