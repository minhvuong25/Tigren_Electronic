import React from 'react';
import { shape, string } from 'prop-types';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import Image from '@magento/venia-ui/lib/components/Image';
import defaultClasses from './item.module.css';

const GalleryItemShimmer = (props = {}) => {
    const { isCategoryPage, productListMode } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isCategoryPage ? classes.categoryRoot : classes.root;
    let itemLayout;
    switch (productListMode) {
        case 'grid':
            itemLayout = classes.grid;
            break;
        case 'list':
            itemLayout = classes.list;
            break;
        default:
            itemLayout = classes.grid;
            break;
    }

    return (
        <div
            className={`${rootClass} ${itemLayout}`}
            aria-live="polite"
            aria-busy="true"
        >
            <Shimmer key="product-image">
                <Image
                    alt="Placeholder for gallery item image"
                    classes={{
                        image: classes.image,
                        root: classes.imageContainer
                    }}
                    src={transparentPlaceholder}
                />
            </Shimmer>
            <Shimmer width="100%" height={2} key="product-name" />
            <Shimmer width={3} height={1.5} key="product-price" />
            <div className={classes.addCart}>
                <Shimmer width={4} height={'40px'} key="quantity-box" />
                <div className={classes.button}>
                    <Shimmer width={6} type="button" key="add-to-cart" />
                </div>
            </div>
            <div className={classes.addTo}>
                <div className={classes.compare}>
                    <Shimmer width={4} key="compare-link" />
                </div>
                <div className={classes.wishlist}>
                    <Shimmer width={5} key="wishlist-link" />
                </div>
            </div>
        </div>
    );
};

GalleryItemShimmer.propTypes = {
    classes: shape({
        root: string
    })
};

export default GalleryItemShimmer;
