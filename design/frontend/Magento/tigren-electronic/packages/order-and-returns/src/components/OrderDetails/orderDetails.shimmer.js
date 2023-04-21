import React from 'react';
import { shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import defaultClasses from './orderDetails.shimmer.module.css';

const OrderDetailsShimmer = (props = {}) => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.rootShimmer}>
            <div className={classes.header}>
                <h3>
                    <Shimmer width="100%" height="100px" />
                </h3>
            </div>
            <div className={classes.info}>
                <div
                    className={classes.item}
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Shimmer width="100%" height="200px" />
                </div>
                <div
                    className={classes.item}
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Shimmer width="100%" height="200px" />
                </div>
                <div
                    className={classes.item}
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Shimmer width="100%" height="100px" />
                </div>
                <div
                    className={classes.item}
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Shimmer width="100%" height="100px" />
                </div>
            </div>
            <div className={classes.listing}>
                <div
                    className={classes.root}
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Shimmer width="100%" height="100px" />
                </div>
                <div
                    className={classes.root}
                    aria-live="polite"
                    aria-busy="true"
                >
                    <Shimmer width="100%" height="100px" />
                </div>
            </div>
        </div>
    );
};

OrderDetailsShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default OrderDetailsShimmer;
