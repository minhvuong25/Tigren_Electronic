import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import DEFAULT_OPERATIONS from './orderHistoryPage.gql';

const PAGE_SIZE = 10;
const DEFAULT_CURRENT_PAGE = 1;

export const useOrderHistoryPage = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getCustomerOrdersQuery } = operations;

    const [
        ,
        {
            actions: { setPageLoading }
        }
    ] = useAppContext();

    const [pageSize, setPageSize] = useState(PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
    const [searchText] = useState('');

    const {
        data: orderData,
        error: getOrderError,
        loading: orderLoading
    } = useQuery(getCustomerOrdersQuery, {
        fetchPolicy: 'cache-and-network',
        variables: {
            filter: {
                number: {
                    match: searchText
                }
            },
            pageSize,
            currentPage
        }
    });

    const orders = orderData ? orderData.customer.orders.items : [];
    const totalPages =
        orderData && orderData.customer.orders.page_info.total_pages;
    const isLoadingWithoutData = !orderData && orderLoading;
    const isBackgroundLoading = !!orderData && orderLoading;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const pageInfo = useMemo(() => {
        if (orderData) {
            const { total_count } = orderData.customer.orders;

            return {
                current: pageSize < total_count ? pageSize : total_count,
                total: total_count
            };
        }

        return null;
    }, [orderData, pageSize]);

    const derivedErrorMessage = useMemo(
        () => deriveErrorMessage([getOrderError]),
        [getOrderError]
    );

    const loadMoreOrders = useMemo(() => {
        if (orderData) {
            const { page_info } = orderData.customer.orders;
            const { current_page, total_pages } = page_info;

            if (current_page < total_pages) {
                return () => setPageSize(current => current + PAGE_SIZE);
            }
        }

        return null;
    }, [orderData]);

    // Update the page indicator if the GraphQL query is in flight.
    useEffect(() => {
        setPageLoading(isBackgroundLoading);
    }, [isBackgroundLoading, setPageLoading]);

    return {
        errorMessage: derivedErrorMessage,
        isBackgroundLoading,
        isLoadingWithoutData,
        loadMoreOrders,
        orders,
        pageInfo,
        searchText,
        pageControl
    };
};
