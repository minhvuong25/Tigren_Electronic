import React, { useMemo } from 'react';
import { array, bool, shape, string } from 'prop-types';

import { useStyle } from '@magento/venia-ui/lib/classify';
import GalleryItem from './item';
import GalleryItemShimmer from '@magento/venia-ui/lib/components/Gallery/item.shimmer';
import defaultClasses from './gallery.module.css';
import { useGallery } from '@magento/peregrine/lib/talons/Gallery/useGallery';

/**
 * Renders a Gallery of items. If items is an array of nulls Gallery will render
 * a placeholder item for each.
 *
 * @params {Array} props.items an array of items to render
 */
const Gallery = props => {
    const { items, isCategoryPage, productListMode } = props;
    const classes = useStyle(props.classes, defaultClasses);
    const talonProps = useGallery();
    const { storeConfig } = talonProps;

    const galleryItems = useMemo(
        () =>
            items.map((item, index) => {
                if (item === null) {
                    return <GalleryItemShimmer key={index} />;
                }
                return (
                    <GalleryItem
                        key={item.id}
                        item={item}
                        storeConfig={storeConfig}
                        isCategoryPage={isCategoryPage}
                        productListMode={productListMode}
                    />
                );
            }),
        [items, storeConfig, productListMode]
    );

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

    const rootClasses = `${isCategoryPage ? classes.categoryGallery : ''} ${
        classes.root
    }`;

    return (
        <div className={rootClasses} aria-live="polite" aria-busy="false">
            <div className={`${classes.items} ${galleryLayout}`}>
                {galleryItems}
            </div>
        </div>
    );
};

Gallery.propTypes = {
    classes: shape({
        filters: string,
        items: string,
        pagination: string,
        root: string
    }),
    items: array.isRequired,
    isCategoryPage: bool
};

export default Gallery;
