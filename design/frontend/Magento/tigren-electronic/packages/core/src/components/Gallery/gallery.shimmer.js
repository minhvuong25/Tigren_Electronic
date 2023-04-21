import React from 'react';
import { array, object, shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';

import GalleryItemShimmer from './item.shimmer';
import defaultClasses from './gallery.module.css';

const GalleryShimmer = props => {
    const { items, itemProps, isCategoryPage, productListMode } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClasses = `${isCategoryPage ? classes.categoryGallery : ''} ${
        classes.root
    }`;

    let galleryLayout;
    switch (productListMode) {
        case 'grid':
            galleryLayout = classes.gridItems;
            break;
        case 'list':
            galleryLayout = classes.listItem;
            break;
        default:
            galleryLayout = classes.gridItems;
            break;
    }

    return (
        <div className={rootClasses} aria-live="polite" aria-busy="true">
            <div className={`${classes.items} ${galleryLayout}`}>
                {items.map((item, index) => (
                    <GalleryItemShimmer
                        key={index}
                        {...itemProps}
                        isCategoryPage={isCategoryPage}
                        productListMode={productListMode}
                    />
                ))}
            </div>
        </div>
    );
};

GalleryShimmer.defaultProps = {
    items: [],
    itemProps: {}
};

GalleryShimmer.propTypes = {
    classes: shape({
        root: string,
        items: string
    }),
    items: array,
    itemProps: shape({
        classes: object
    })
};

export default GalleryShimmer;
