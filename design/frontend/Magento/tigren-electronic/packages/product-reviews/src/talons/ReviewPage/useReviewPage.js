import { useLazyQuery } from '@apollo/client';
import { usePagination } from '@magento/peregrine';
import { useEffect } from 'react';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import get from '@tigrensolutions/product-reviews/src/utils/get';

import DEFAULT_OPERATION from './review.gql';

const PAGE_SIZE = 10;

const useReviewPage = () => {
    const operations = mergeOperations(DEFAULT_OPERATION);
    const { getCustomerReviews } = operations;

    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const [fetchCustomerReviews, queryResult] = useLazyQuery(
        getCustomerReviews,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const { data, error, loading } = queryResult;

    const reviews = get(data, 'customer.reviews.items', []);

    const totalPagesFromData = get(
        data,
        'customer.reviews.page_info.total_pages',
        null
    );

    useEffect(() => {
        fetchCustomerReviews({
            variables: {
                currentPage,
                pageSize: PAGE_SIZE
            }
        });
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);

    return {
        reviews,
        error,
        loading,
        pageControl,
        totalPagesFromData
    };
};

export default useReviewPage;
