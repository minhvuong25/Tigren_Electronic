import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import { shape, string } from 'prop-types';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

import defaultClasses from './reviewDetail.module.css';

const ReviewDetailShimmer = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <div className={classes.skeleton}>
            <div className={classes.wrapDetailContent}>
                <div className={classes.reviewDetails}>
                    <div className={classes.wrapImg}>
                        <Shimmer width="100%" height="100%" />
                    </div>
                    <div className={classes.wrapStarContainer}>
                        <div className={classes.nameProduct}>
                            <Shimmer width="100%" height="100%" />
                        </div>
                        <div className={classes.ratingContainer}>
                            <Shimmer width="200px" height="100%" />
                        </div>
                    </div>
                </div>

                <div className={classes.myReview}>
                    <Shimmer width="100%" height="200px" />
                </div>
            </div>
        </div>
    );
};
export default ReviewDetailShimmer;

ReviewDetailShimmer.defaultProps = {
    classes: {}
};
ReviewDetailShimmer.propTypes = {
    classes: shape({
        skeleton: string
    })
};
