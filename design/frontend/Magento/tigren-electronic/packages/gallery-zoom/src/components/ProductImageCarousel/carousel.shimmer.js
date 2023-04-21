import React from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultShimmerClasses from './carousel.shimmer.module.css';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';

const CarouselShimmer = props => {
    const classes = useStyle(defaultShimmerClasses, props.classes);

    return (
        <div className={classes.root}>
            <div className={classes.carouselContainer}>
                <Shimmer height="100%" width="100%" key="carousel-image" />
            </div>
        </div>
    );
};

export default CarouselShimmer;
