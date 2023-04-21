import React from 'react';
import { shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import defaultClasses from './product.shimmer.module.css';

const ProductShimmer = (props = {}) => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.rootShimmer}>
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

ProductShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default ProductShimmer;
