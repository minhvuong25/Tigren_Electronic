import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useHistory } from 'react-router-dom';
import DEFAULT_OPERATION from '../review.gql';
import { useQuery } from '@apollo/client';
import { useCallback } from 'react';

export const useReviewDetails = props => {
    const { id } = props;
    const operations = mergeOperations(DEFAULT_OPERATION);
    const history = useHistory();
    const { getDetailReview } = operations;

    const { error: errorReview, loading: loadingReview, data } = useQuery(
        getDetailReview,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first',
            variables: {
                idReview: id
            },
            skip: !id
        }
    );

    const reviewDetails = !!data && !loadingReview && data?.getReviewDetail;
    const product = reviewDetails?.product || null;
    const handleWriteReview = useCallback(() => {
        if (product) {
            const productUrl = getProductUrl({ product });
            history.push({
                pathname: '/' + productUrl,
                hash: 'writeReview'
            });
        }
    }, [history, product]);

    return {
        loadingReview,
        errorReview,
        reviewDetails,
        handleWriteReview
    };
};
