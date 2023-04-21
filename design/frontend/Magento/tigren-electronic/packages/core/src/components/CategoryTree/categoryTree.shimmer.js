import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import defaultClasses from '@magento/venia-ui/lib/components/CategoryTree/categoryLeaf.module.css';

const CategoryTreeShimmer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const shimmers = new Array(4).fill(null).map((_, index) => (
        <li key={index} className={`${classes.root} shimmer`}>
            <div className={classes.target}>
                <Shimmer type="textInput" />
            </div>
        </li>
    ));
    return <>{shimmers}</>;
};

export default CategoryTreeShimmer;
