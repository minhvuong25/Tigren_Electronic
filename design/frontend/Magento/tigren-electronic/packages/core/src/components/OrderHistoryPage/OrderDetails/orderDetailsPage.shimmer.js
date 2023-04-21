import React, { Fragment } from 'react';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './orderDetailsPage.module.css';

const OrderDetailsPageShimmer = (props = {}) => {
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <Fragment>
            <div className={classes.skeleton}>
                <div className={classes.heading}>
                    <Shimmer width="100%" height={'100%'} />
                </div>

                <div className={classes.details}>
                    <Shimmer width="100%" height="100%" />
                </div>

                <div className={classes.footer}>
                    <Shimmer width="100%" height="100%" />
                </div>
            </div>
        </Fragment>
    );
};

OrderDetailsPageShimmer.defaultProps = {
    classes: {}
};

OrderDetailsPageShimmer.propTypes = {};

export default OrderDetailsPageShimmer;
