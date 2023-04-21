import React from 'react';
import { jarallax } from 'jarallax';
import { gql, useQuery } from '@apollo/client';
import SlickSlider from 'react-slick';
import defaultClasses from './category.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { arrayOf, shape, string } from 'prop-types';
import CategoryItem from './categoryItem';

import CategoryShimmer from './category.shimmer';

/**
 * Page Builder HTML component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 *
 * @typedef Category
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that renders HTML with optional styling properties.
 */
const Category = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const {
        categoryId,
        isSlider,
        showArrow,
        showDots,
        slidesToShow,
        textAlign,
        border,
        borderColor,
        borderWidth,
        borderRadius,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        cssClasses = [],
        rootClasses
    } = props;

    const dynamicStyles = {
        textAlign,
        border,
        borderColor,
        borderWidth,
        borderRadius,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };

    const categoryIdItem = categoryId && categoryId.split(',');
    const { data, loading } = useQuery(GET_CATEGORY_ITEM, {
        variables: { id: categoryIdItem },
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    if (loading) {
        return (
            <CategoryShimmer
                slidesToShow={parseInt(slidesToShow)}
                isSlider={isSlider}
            />
        );
    }

    const categoryList = data && data.categoryList;
    const content =
        categoryList &&
        categoryList.map((item, index) => {
            return (
                <div key={index} className={classes.item}>
                    <CategoryItem item={item} />
                </div>
            );
        });

    if (isSlider && isSlider === 'true') {
        const jarallaxInstances = {};
        const slidesToShowInt = parseInt(slidesToShow);
        const isShowDots = showDots === 'true';
        const isShowArrow = showArrow === 'true';
        const sliderSettings = {
            dots: isShowDots,
            arrows: isShowArrow,
            lazyLoad: 'ondemand',
            slidesToShow: slidesToShowInt,
            slidesToScroll: slidesToShowInt,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow:
                            slidesToShowInt >= 4 ? 4 : slidesToShowInt,
                        slidesToScroll: slidesToShowInt >= 4 ? 4 : slidesToShowInt,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow:
                            slidesToShowInt >= 3 ? 3 : slidesToShowInt,
                        slidesToScroll: slidesToShowInt >= 3 ? 3 : slidesToShowInt,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow:
                            slidesToShowInt >= 3 ? 3 : slidesToShowInt,
                        slidesToScroll: slidesToShowInt >= 3 ? 3 : slidesToShowInt,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow:
                            slidesToShowInt >= 3 ? 3 : slidesToShowInt,
                        slidesToScroll: slidesToShowInt >= 3 ? 3 : slidesToShowInt,
                        dots: true,
                        infinite: true
                    }
                }
            ],
            afterChange: () => {
                Object.keys(jarallaxInstances).map(key => {
                    jarallax(jarallaxInstances[key].element, 'onScroll');
                });
            }
        };

        return (
            <div
                style={dynamicStyles}
                className={[classes.root, rootClasses, ...cssClasses].join(' ')}
            >
                <SlickSlider {...sliderSettings}>{content}</SlickSlider>
            </div>
        );
    }

    return (
        <div
            style={dynamicStyles}
            className={[classes.rootGrid, rootClasses, ...cssClasses].join(' ')}
        >
            {content}
        </div>
    );
};

/**
 * Props for {@link Category}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the Html
 * @property {String} classes.root CSS classes for the root container element
 * @property {String} html HTML code to be rendered as part of component
 * @property {String} textAlign Alignment of the video within the parent container
 * @property {String} border CSS border property
 * @property {String} borderColor CSS border color property
 * @property {String} borderWidth CSS border width property
 * @property {String} borderRadius CSS border radius property
 * @property {String} marginTop CSS margin top property
 * @property {String} marginRight CSS margin right property
 * @property {String} marginBottom CSS margin bottom property
 * @property {String} marginLeft CSS margin left property
 * @property {String} paddingTop CSS padding top property
 * @property {String} paddingRight CSS padding right property
 * @property {String} paddingBottom CSS padding bottom property
 * @property {String} paddingLeft CSS padding left property
 * @property {Array} cssClasses List of CSS classes to be applied to the component
 */
Category.propTypes = {
    classes: shape({
        root: string
    }),
    html: string,
    textAlign: string,
    border: string,
    borderColor: string,
    borderWidth: string,
    borderRadius: string,
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string,
    paddingTop: string,
    paddingRight: string,
    paddingBottom: string,
    cssClasses: arrayOf(string)
};

export default Category;

export const GET_CATEGORY_ITEM = gql`
    query GetCategoryList($id: [String]!) {
        categoryList(filters: { ids: { in: $id } }) {
            id
            uid
            name
            url_path
            url_suffix
            thumbnail
        }
    }
`;
