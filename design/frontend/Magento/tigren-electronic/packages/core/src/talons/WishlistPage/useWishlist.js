import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { usePagination } from '@magento/peregrine';
import defaultOperations from './wishlist.gql';
import get from '@tigrensolutions/core/src/util/get';

/**
 * @function
 * @param {String} props.wishlistId The ID of the wishlist this item belongs to
 * @para  {itemsCount} props.itemsCount The items count fo the list.
 * @param {Boolean} props.isCollapsed state of is visable
 * @returns {WishListProps}
 */
const PAGE_SIZE = 16;

export const useWishlist = (props = {}) => {
    const { id, isCollapsed } = props;
    const operations = mergeOperations(defaultOperations, props.operations);
    const [isOpen, setIsOpen] = useState(!isCollapsed);
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const [fetchWishlistItems, queryResult] = useLazyQuery(
        operations.getCustomerWishlistItems,
        {
            fetchPolicy: 'no-cache',
            nextFetchPolicy: 'no-cache'
        }
    );

    const { data, error, loading } = queryResult;

    const items = get(data, 'customer.wishlist_v2.items_v2.items', []);

    const totalPagesFromData = get(
        data,
        'customer.wishlist_v2.items_v2.page_info.total_pages',
        null
    );

    useEffect(() => {
        fetchWishlistItems({
            variables: {
                id,
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

    useEffect(() => {
        if (totalPagesFromData && totalPagesFromData < currentPage) {
            setCurrentPage(totalPagesFromData);
        }
    }, [totalPagesFromData, currentPage, setCurrentPage]);

    const handleContentToggle = () => {
        setIsOpen(currentValue => !currentValue);
    };

    const refreshWishlist = useCallback(() => {
        fetchWishlistItems({
            variables: {
                id,
                currentPage,
                pageSize: PAGE_SIZE
            }
        });
    }, [currentPage, fetchWishlistItems]);

    return {
        handleContentToggle,
        isOpen,
        items,
        error,
        pageControl,
        refreshWishlist,
        totalPagesFromData,
        isLoading: !!loading
    };
};

/**
 * JSDoc type definitions
 */

/**
 * Props data to use when rendering the Wishlist component.
 *
 * @typedef {Object} WishListProps
 *
 * @property {Function} handleContentToggle Callback to handle list expand toggle
 * @property {Boolean} isOpen Boolean which represents if the content is expanded or not
 * @property {Array} items list of items
 * @property {Boolean} isLoading Boolean which represents if is in loading state
 * @property {Boolean} isFetchingMore Boolean which represents if is in loading more state
 */
