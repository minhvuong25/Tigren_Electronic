import { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import DEFAULT_OPERATIONS from './orderHistoryPage.gql';
import { REORDER_ITEM } from './ReorderItem.gql';
import { useToasts } from '@magento/peregrine';

export const useOrderDetailsPage = (props = {}) => {
    const { params } = props;
    const [, { addToast }] = useToasts();

    const [isLoading, setIsLoading] = useState(false);
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getCustomerOrdersDetailQuery } = operations;

    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();
    const history = useHistory();
    const [{ isSignedIn }] = useUserContext();

    const {
        data: orderData,
        error: getOrderError,
        loading: orderLoading
    } = useQuery(getCustomerOrdersDetailQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            filter: {
                number: {
                    eq: params
                }
            }
        }
    });

    const orders =
        orderData && orderData.customer && orderData.customer.orders
            ? orderData.customer.orders.items
            : [];

    const isLoadingWithoutData = !orderData && orderLoading;
    const isBackgroundLoading = !!orderData && orderLoading;

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([getOrderError]),
        [getOrderError]
    );

    useEffect(() => {
        if (!isSignedIn) {
            history.push('/');
        }
    }, [history, isSignedIn]);

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(isBackgroundLoading);
    }, [isBackgroundLoading, setPageLoading]);
    const [
        reorderItems,
        { data: reorderResults, error: errorReorder, loading: isReorderLoading }
    ] = useMutation(REORDER_ITEM);

    // Show error when reorder is get trouble
    useEffect(() => {
        if (errorReorder) {
            const errorMessage = deriveErrorMessage([errorReorder]);
            addToast({
                type: 'error',
                message: errorMessage,
                timeout: 7000
            });
        }
    }, [errorReorder, addToast]);

    useEffect(() => {
        if (reorderResults && !isReorderLoading) {
            return reorderResults.reorderItems.userInputErrors.map(index => {
                const messageItem = index.message;
                return addToast({
                    type: 'error',
                    message: messageItem,
                    timeout: 9000
                });
            });
        }
    }, [reorderResults, isReorderLoading]);

    const orderNumber = orders && orders[0] && orders[0].number;

    const handleReorder = useCallback(async () => {
        try {
            setIsLoading(true);
            const variables = {
                orderNumber: orderNumber
            };

            await reorderItems({
                variables
            });
            history.push('/checkout/cart');
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [orderNumber]);

    const handlePrintCompare = useCallback(() => {
        history.push(`/print-order/${orderNumber}`);
    }, [orderNumber, orders]);

    return {
        errorMessage: derivedErrorMessage,
        isBackgroundLoading,
        isLoadingWithoutData,
        orders,
        orderLoading,
        handleReorder,
        handlePrintCompare,
        isLoading
    };
};
