import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Util } from '@magento/peregrine';
import DEFAULT_OPERATIONS from './checkoutSuccess.gql.js';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

export const useCheckoutSuccess = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getOrderDetailsQuery } = operations;

    const orderNumber = storage.getItem('lastOrderNumber');
    const isCreateAccountAfterCheckout = storage.getItem(
        'isCreateAccountAfterCheckout'
    );

    const { error, loading, data } = useQuery(getOrderDetailsQuery, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-and-network',
        skip: !orderNumber,
        variables: {
            orderNumber: orderNumber
        }
    });

    useEffect(() => {
        return () => {
            if (isCreateAccountAfterCheckout) {
                storage.removeItem('isCreateAccountAfterCheckout');
            }
        };
    });

    const orderData = data && data.order;

    return {
        orderNumber,
        error,
        loading,
        orderData,
        isCreateAccountAfterCheckout
    };
};
