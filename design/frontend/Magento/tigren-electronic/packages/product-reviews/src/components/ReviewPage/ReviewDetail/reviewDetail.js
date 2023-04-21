import React, { useMemo } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { useReviewDetails } from '@tigrensolutions/product-reviews/src/talons/ReviewPage/ReviewDetails/useReviewDetails';
import { useToasts } from '@magento/peregrine';
import { Link, useHistory, useParams } from 'react-router-dom';

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { formattedDate } from '../../../utils/index';

import { FormattedMessage } from 'react-intl';
import Image from '@magento/venia-ui/lib/components/Image';
import Rating from '../../Rating';
import Button from '@magento/venia-ui/lib/components/Button';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import defaultClasses from './reviewDetail.module.css';
import ReviewDetailShimmer from './reviewDetail.shimmer';

const IMAGE_SIZE = 300;

const ReviewDetails = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const params = useParams();
    const [, { addToast }] = useToasts();
    const {
        loadingReview,
        reviewDetails,
        errorReview,
        handleWriteReview
    } = useReviewDetails({
        id: params?.id
    });

    const history = useHistory();
    const pageContent = useMemo(() => {
        if (errorReview) {
            addToast({
                type: 'error',
                message: JSON.stringify(errorReview),
                timeout: 7000
            });
            return <div />;
        }

        if (loadingReview) {
            return <ReviewDetailShimmer />;
        }

        if (reviewDetails) {
            const { product } = reviewDetails;
            const { name, small_image } = product;
            const { url: smallImageURL } = small_image;
            const ratingProductVoteStar = Number(product?.rating_summary || 0);
            const ratingVoteStar = Number(reviewDetails?.average_rating || 0);

            return (
                <div className={classes.wrapDetailContent}>
                    <div className={classes.reviewDetails}>
                        <div className={classes.wrapImg}>
                            <Image
                                alt={name}
                                resource={smallImageURL}
                                width={IMAGE_SIZE}
                            />
                        </div>
                        <div className={classes.wrapStarContainer}>
                            <h3 className={classes.nameProduct}>{name}</h3>
                            <div className={classes.ratingContainer}>
                                <Rating
                                    value={ratingProductVoteStar}
                                    percent={ratingProductVoteStar}
                                    isReviewPage={true}
                                    classes={{
                                        root: classes.rating
                                    }}
                                />

                                <span>
                                    <FormattedMessage
                                        id={'productFulLDetail.reviewCount'}
                                        defaultMessage={'{count} review(s)'}
                                        values={{
                                            count: product.review_count
                                        }}
                                    />
                                </span>

                                <LinkButton onClick={handleWriteReview}>
                                    <FormattedMessage
                                        id="advancedReviews.writeAReview"
                                        defaultMessage="Write a review"
                                    />
                                </LinkButton>
                            </div>
                        </div>
                    </div>

                    <div className={classes.myReview}>
                        <h4 className={classes.reviewTitle}>
                            <FormattedMessage
                                id={'reviewPage.title'}
                                defaultMessage={'My Product Reviews'}
                            />
                        </h4>
                        <div className={classes.wrapReviewBox}>
                            <div className={classes.review}>
                                <span className={classes.name}>
                                    {reviewDetails.nickname}
                                </span>
                                <Rating
                                    value={ratingVoteStar}
                                    percent={ratingVoteStar}
                                    isReviewPage={true}
                                    classes={{
                                        root: classes.ratingComment
                                    }}
                                />
                            </div>
                            <h5 className={classes.reviewText}>
                                {reviewDetails.title}
                            </h5>
                            <p className={classes.reviewDetail}>
                                {reviewDetails.detail}
                            </p>
                            <h6 className={classes.date}>
                                {formattedDate(reviewDetails.created_at)}
                            </h6>
                        </div>
                    </div>

                    <Button
                        priority="low"
                        classes={{
                            root_lowPriority: classes.goBack
                        }}
                        onClick={() => history.goBack()}
                    >
                        <FormattedMessage
                            id={'accountInformation.back'}
                            defaultMessage={'Go back'}
                        />
                    </Button>
                </div>
            );
        }
    }, [reviewDetails, loadingReview, errorReview]);

    return (
        <div className={classes.root}>
            <h1 className={classes.title}>
                <FormattedMessage
                    id={'reviewDetails.detail'}
                    defaultMessage={'Review details'}
                />
            </h1>
            {pageContent}
        </div>
    );
};
export default ReviewDetails;
