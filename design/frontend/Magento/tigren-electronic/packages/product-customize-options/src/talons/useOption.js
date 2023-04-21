import { useCallback, useMemo } from 'react';
import { Util } from '@magento/peregrine';
import { GET_STORE_CONFIG_DATA } from '@magento/peregrine/lib/talons/Header/storeSwitcher.gql';
import { TAX_DISPLAY_TYPES } from '@tigrensolutions/base/src/talons/ProductPrice/useProductPrice';
import { useApolloClient } from '@apollo/client';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

export const getOptionPrice = (item, price, type) => {
    if (!item || !price || !type) {
        return null;
    }
    const { special_price, base_price } = item;
    let showPrice = price;
    if (type == 'PERCENT') {
        const final = special_price ? special_price : base_price;
        showPrice = (price * final) / 100;
    }
    return showPrice.toFixed(2);
};

export const useOption = props => {
    const { product, option, onOptionChange } = props;

    const apolloClient = useApolloClient();
    const dataStoreConfig = apolloClient.readQuery({
        query: GET_STORE_CONFIG_DATA
    });

    const taxDisplayType = dataStoreConfig?.storeConfig?.tax_display_type;
    const isShowExclTax = taxDisplayType === TAX_DISPLAY_TYPES.BOTH;

    const optionPrice = useMemo(
        (price, type) => getOptionPrice(product, price, type),
        [product]
    );

    const currency = useMemo(() => {
        return storage.getItem('store_view_currency') || 'THB';
    }, []);

    const handleOptionChange = useCallback(
        (event, type) => {
            let value;
            switch (type) {
                case 'select':
                    value = event.value;
                    break;
                case 'muti_select':
                    value = event.reduce((result, item) => {
                        result.push(item.value);
                        return result;
                    }, []);
                    break;
                default:
                    value = event.target.value;
                    break;
            }
            onOptionChange(option.option_id, value);
        },
        [option, onOptionChange]
    );

    return {
        optionPrice,
        currency,
        handleOptionChange,
        isShowExclTax
    };
};
