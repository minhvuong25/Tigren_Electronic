import DEFAULT_OPERATIONS from './productReviews.gql';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import { usePagination } from '@magento/peregrine';
import { useHistory, useLocation } from 'react-router-dom';

const PAGE_SIZE = 10;

const setQueryParam = ({ history, location, parameter, replace, value }) => {
    const { search } = location;
    const queryParams = new URLSearchParams(search);

    queryParams.set(parameter, value);
    const destination = { search: queryParams.toString() };

    if (replace) {
        history.replace(destination);
    } else {
        history.push(destination);
    }
};

const useProductReview = ({ product, reviewListRef }) => {
    const [isShowReviewForm, setIsShowReviewForm] = useState(false);
    const rating_summary = product.rating_summary;
    const review_count = product.review_count;

    const history = useHistory();
    const location = useLocation();

    const namespace = '';
    const parameter = 'page';

    const searchParam = namespace ? `${namespace}_${parameter}` : parameter;

    const {
        getReviewStoreConfigData,
        getProductReviewsProductPage
    } = DEFAULT_OPERATIONS;

    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setTotalPages } = paginationApi;

    // use the location to hold state
    const setCurrentPage = useCallback(
        (page, replace = false) => {
            // Update the query parameter.
            setQueryParam({
                history,
                location,
                parameter: searchParam,
                replace,
                value: page
            });
            const element = reviewListRef.current;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        [history, location, searchParam]
    );

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };

    const [fetchProductReviewsProductPage, queryResult] = useLazyQuery(
        getProductReviewsProductPage,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const { data: reviewStoreConfigData } = useQuery(getReviewStoreConfigData, {
        fetchPolicy: 'cache-and-network'
    });

    const [, { toggleDrawer }] = useAppContext();
    const handleSignIn = useCallback(() => {
        toggleDrawer('popup_login');
    }, [toggleDrawer]);
    const handleShowReviewForm = useCallback(() => {
        setIsShowReviewForm(true);
    }, [isShowReviewForm]);

    const handleHideReviewForm = useCallback(() => {
        setIsShowReviewForm(false);
    }, [isShowReviewForm]);

    useEffect(() => {
        fetchProductReviewsProductPage({
            variables: {
                urlKey: product.url_key,
                currentPage,
                pageSize: PAGE_SIZE
            }
        });
    }, [currentPage]);

    const { data, error, loading } = queryResult;

    const totalPagesFromData = data
        ? data.products.items[0].reviews.page_info.total_pages
        : null;

    useEffect(() => {
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [setTotalPages, totalPagesFromData]);

    return {
        rating_summary,
        review_count,
        reviews: data && data.products.items[0].reviews,
        error,
        loading,
        pageControl,
        totalPagesFromData,
        handleSignIn,
        handleHideReviewForm,
        handleShowReviewForm,
        isShowReviewForm,
        reviewConfigData:
            (reviewStoreConfigData && reviewStoreConfigData.storeConfig) || {}
    };
};

export default useProductReview;
