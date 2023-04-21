import React, { useMemo } from 'react';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';

import useReviewPage from '@tigrensolutions/product-reviews/src/talons/ReviewPage/useReviewPage';

import { FormattedMessage } from 'react-intl';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import Reviews from './reviews';
import imgNoReview from '@tigrensolutions/product-reviews/src/static/images/no-review.png';

import defaultClasses from './reviewPage.module.css';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

const ReviewPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        loading,
        error,
        reviews,
        pageControl,
        totalPagesFromData
    } = useReviewPage();

    const pagination = totalPagesFromData ? (
        <Pagination pageControl={pageControl} />
    ) : null;

    const pageContent = useMemo(() => {
        const errorMessage = deriveErrorMessage([error]);

        if (error) {
            return (
                <div className={classes.error}>
                    <p>{errorMessage}</p>
                </div>
            );
        }

        if (loading) {
            return (
                <div className={classes.skeleton}>
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                    <Shimmer width="100%" height="100%" />
                </div>
            );
        }

        if (reviews && reviews.length > 0) {
            return (
                <div className={classes.wrapContent}>
                    <Reviews items={reviews} />
                    {pagination}
                </div>
            );
        } else if (reviews && reviews.length === 0) {
            return (
                <div className={classes.wrapNoReview}>
                    <img
                        alt={'no review'}
                        className={classes.noReview}
                        src={imgNoReview}
                    />
                    <p className={classes.emptyReview}>
                        <FormattedMessage
                            id={'reviewPage.noReviews'}
                            defaultMessage={'You have submitted no reviews.'}
                        />
                    </p>
                </div>
            );
        }
    }, [error, loading, reviews, pagination]);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'reviewPage.title'}
                    defaultMessage={'My Product Reviews'}
                />
            </h1>
            {pageContent}
        </div>
    );
};
export default ReviewPage;
