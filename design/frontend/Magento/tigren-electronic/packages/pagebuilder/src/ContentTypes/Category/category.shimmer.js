import React from 'react';
import { shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import defaultClasses from './category.shimmer.module.css';
import SlickSlider from 'react-slick';

const CategoryShimmer = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { slidesToShow, isSlider } = props;

    const content = new Array(slidesToShow).fill(null).map((item, index) => (
        <div key={index}>
            <Shimmer
                aria-live="polite"
                aria-busy="true"
                classes={{
                    root_rectangle: classes.shimmerRoot
                }}
                width="100%"
                height="80px"
            />
            <Shimmer width="100%" key="product-name" height="20px" />
        </div>
    ));

    if (isSlider && isSlider === 'true') {
        const sliderSettings = {
            dots: false,
            arrows: false,
            lazyLoad: 'ondemand',
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: slidesToShow >= 4 ? 4 : slidesToShow,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: slidesToShow >= 3 ? 3 : slidesToShow,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: slidesToShow >= 3 ? 3 : slidesToShow,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: slidesToShow >= 3 ? 3 : slidesToShow,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <div className={classes.root}>
                <SlickSlider {...sliderSettings}>{content}</SlickSlider>
            </div>
        );
    }

    return <div className={classes.rootGrid}>{content}</div>;
};
CategoryShimmer.defaultProps = {
    classes: {}
};
CategoryShimmer.propTypes = {
    classes: shape({
        root: string,
        item: string
    })
};
export default CategoryShimmer;
