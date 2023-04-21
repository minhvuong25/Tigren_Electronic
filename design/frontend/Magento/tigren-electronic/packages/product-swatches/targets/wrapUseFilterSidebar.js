import { useEffect } from 'react';
import { useProductSwatchContext } from '@tigrensolutions/product-swatches/src/context';

const wrapUserFilterList = original => {
    return function wrapUserFilterList(props, ...restArgs) {
        const { ...defaultReturnData } = original(props, ...restArgs);
        const { filterState } = defaultReturnData;

        const { setFilterState } = useProductSwatchContext();

        /*
         * Save filter state into the context, then these values will be used to
         * auto change options of product item when filter change.
         */
        useEffect(() => {
            if (filterState && typeof setFilterState === 'function') {
                setFilterState(filterState);
            }
        }, [filterState, setFilterState]);

        return {
            ...defaultReturnData
        };
    };
};

export default wrapUserFilterList;
