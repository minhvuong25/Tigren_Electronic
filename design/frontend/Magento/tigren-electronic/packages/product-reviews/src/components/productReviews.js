import React, { useEffect, useMemo, useRef } from 'react';
import { number, shape } from 'prop-types';
import useProductReview from '@tigrensolutions/product-reviews/src/talons/useProductReview';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productReviews.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import Review from './review';
import Button from '@magento/venia-ui/lib/components/Button';
import ReviewForm from './ReviewForm';
import Pagination from '@magento/venia-ui/lib/components/Pagination';
import { deriveErrorMessage } from '@magento/peregrine/lib/util/deriveErrorMessage';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

const starsMap = [1, 2, 3, 4, 5];

const ProductReviews = props => {
    const { product, reviewRef } = props;
    const { formatMessage } = useIntl();
    const reviewFormRef = useRef(null);
    const reviewListRef = useRef();
    const {
        rating_summary,
        review_count,
        reviews,
        error,
        loading,
        pageControl,
        totalPagesFromData,
        handleSignIn,
        handleHideReviewForm,
        handleShowReviewForm,
        isShowReviewForm,
        reviewConfigData
    } = useProductReview({
        product: product,
        reviewListRef: reviewListRef
    });

    const items = reviews && reviews.items;

    const pagination = totalPagesFromData ? (
        <Pagination pageControl={pageControl} />
    ) : null;

    const classes = useStyle(defaultClasses, props.classes);
    const [{ isSignedIn }] = useUserContext();

    const detail = starsMap?.map((value, index) => {
        const countItem = items
            ? items.filter(
                  item =>
                      item &&
                      item?.average_rating &&
                      Number(Math.round(item.average_rating / 20)) ===
                          Number(value)
              )
            : [];

        const percent =
            countItem && countItem.length
                ? (
                      ((countItem && countItem.length) * 100) /
                      (items && items.length)
                  ).toFixed(0)
                : 0;

        return (
            <button type="button" className={classes.detailsItem} key={index}>
                <span className={classes.detailsStars}>
                    <FormattedMessage
                        id={'productFulLDetail.reviewCount'}
                        defaultMessage={'{count} star(s)'}
                        values={{
                            count: value
                        }}
                    />
                </span>
                <span className={classes.detailsBar}>
                    <span
                        className={classes.detailsBarValue}
                        style={{
                            width: `${percent}%`
                        }}
                    />
                </span>
                <span className={classes.detailsPercent}>
                    {`${percent}% (${countItem.length})`}
                </span>
            </button>
        );
    });

    const isAllowGuest =
        reviewConfigData?.allow_guests_to_write_product_reviews;

    const reviewItems = useMemo(() => {
        return (
            Array.isArray(items) &&
            items.length > 0 &&
            items.map((item, index) => {
                return <Review key={index} {...item} />;
            })
        );
    }, [error, loading, reviews, pagination]);

    const reviewList = useMemo(() => {
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
                    <Shimmer width="100%" height="200px" />
                    <Shimmer width="100%" height="200px" />
                </div>
            );
        }

        return (
            <div className={classes.reviewsRoot}>
                <div className={`${classes.list}`}>{reviewItems}</div>
                {pagination}
            </div>
        );
    }, [error, loading, reviews, pagination]);

    useEffect(() => {
        const hash = location && location.hash;
        if (hash === '#writeReview' && reviewRef && reviewRef.current) {
            reviewRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });

    return (
        <div
            ref={reviewRef}
            className={`${classes.root} ${classes.reviewContent}`}
        >
            <div className={classes.wrapReviews} ref={reviewListRef}>
                <div className={classes.wrapForm}>
                    <div className={classes.wrapTopTitle}>
                        <h3 className={classes.reviewTitle}>
                            {formatMessage({
                                id: 'productFullDetail.review',
                                defaultMessage: 'Product Review'
                            })}
                        </h3>
                        <div className={classes.wrapBtn}>
                            <div className={classes.summary}>
                                <div className={classes.info}>
                                    <div className={classes.rating}>
                                        <div className={classes.ratingValue}>
                                            {(
                                                (rating_summary / 100) *
                                                5
                                            ).toFixed(1)}
                                        </div>
                                        <div
                                            className={classes.ratingStarsRoot}
                                        >
                                            <div className={classes.ratingRoot}>
                                                <div
                                                    className={classes.stars}
                                                    title={`${review_count} ${
                                                        review_count > 1
                                                            ? 'stars'
                                                            : 'star'
                                                    }`}
                                                >
                                                    <div
                                                        style={{
                                                            width: `${rating_summary}%`
                                                        }}
                                                        className={
                                                            classes.starsFilled
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <p className={classes.count}>
                                                <FormattedMessage
                                                    id={
                                                        'productFulLDetail.reviewCount'
                                                    }
                                                    defaultMessage={
                                                        '{count} review(s)'
                                                    }
                                                    values={{
                                                        count: review_count
                                                    }}
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.details}>{detail}</div>
                                <div className={classes.goToReviews}>
                                    {reviewConfigData?.product_reviews_enabled ? (
                                        isAllowGuest === '0' && !isSignedIn ? (
                                            <Button
                                                onClick={handleSignIn}
                                                priority={'danger'}
                                                data-cy={'signIn-button'}
                                            >
                                                <FormattedMessage
                                                    id="advancedReviews.writeAReview"
                                                    defaultMessage="Write a review"
                                                />
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleShowReviewForm}
                                                priority={'danger'}
                                                data-cy={'Review-button'}
                                            >
                                                <FormattedMessage
                                                    id="advancedReviews.writeAReview"
                                                    defaultMessage="Write a review"
                                                />
                                            </Button>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    {isShowReviewForm && (
                        <div ref={reviewFormRef} className={classes.reviewForm}>
                            <ReviewForm
                                product={product}
                                handleHideReviewForm={handleHideReviewForm}
                            />
                        </div>
                    )}
                </div>
                {reviewList}
            </div>
        </div>
    );
};

ProductReviews.propTypes = {
    product: shape({
        id: number.isRequired
    })
};

export default ProductReviews;
