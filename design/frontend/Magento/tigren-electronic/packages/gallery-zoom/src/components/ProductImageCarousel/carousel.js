import React, { useCallback, useMemo, useRef } from 'react';

import cb from 'classnames';
import makeUrl from '@magento/peregrine/lib/util/makeUrl';

import { useScrollLock } from '@magento/peregrine';
import { useProductImageCarousel } from '@magento/peregrine/lib/talons/ProductImageCarousel/useProductImageCarousel';
import { useStyle } from '@magento/venia-ui/lib/classify';
import useScreenType from '@tigrensolutions/gallery-zoom/src/hooks/useReactScreenType';

import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';
import ImageGallery from 'react-image-gallery';
import ImageZoom from '../ImageZoom';

import '@tigrensolutions/gallery-zoom/src/extendStyles/image-gallery.scss';
import defaultClasses from './carousel.module.css';

const IMAGE_WIDTH = 640;

/**
 * Carousel component for product images
 * Carousel - Component that holds number of images
 * where typically one image visible, and other
 * images can be navigated through previous and next buttons
 *
 * @typedef ProductImageCarousel
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns {React.Element} React carousel component that displays a product image
 */

const ProductImageCarousel = props => {
    const {
        images = [],
        width = IMAGE_WIDTH,
        additionalGalleryProps = {}
    } = props;

    const talonProps = useProductImageCarousel({
        images,
        imageWidth: width
    });

    const { sortedImages = [] } = talonProps;

    const fullScreen = useRef(false);

    useScrollLock(fullScreen.current);

    const handleOnChangeScreen = useCallback(isFullScreen => {
        fullScreen.current = isFullScreen;
    }, []);

    const classes = useStyle(defaultClasses, props.classes);

    const { isDesktop, isLargeDesktop } = useScreenType();

    const isLargeScreen = isDesktop || isLargeDesktop;

    const galleryImages = useMemo(
        () =>
            sortedImages.map(imageItem => {
                const fullImageSrc = imageItem.file
                    ? makeUrl(imageItem.file, {
                          type: 'image-product',
                          width
                      })
                    : transparentPlaceholder;
                const optimizedSrc = imageItem.file
                    ? makeUrl(imageItem.file, {
                          type: 'image-product',
                          width
                      })
                    : transparentPlaceholder;
                const thumbnailSrc = imageItem.file
                    ? makeUrl(imageItem.file, {
                          type: 'image-product',
                          height: 120
                      })
                    : transparentPlaceholder;

                return {
                    original: fullImageSrc,
                    thumbnail: thumbnailSrc,
                    renderItem: () => (
                        <ImageZoom
                            fullSrc={fullImageSrc}
                            optimizedSrc={optimizedSrc}
                            isFullScreen={fullScreen.current}
                        />
                    )
                };
            }),
        [sortedImages, fullScreen.current]
    );

    const defaultGalleryProps = {
        lazyLoad: true,
        showFullscreenButton: true,
        thumbnailPosition: !isLargeScreen ? 'bottom' : 'left',
        useBrowserFullscreen: !isLargeScreen,
        disableSwipe: false,
        disableKeyDown: false,
        transparentPlaceholder: transparentPlaceholder,
        showPlayButton: false,
        items: galleryImages,
        showNav: galleryImages.length > 10 && isLargeScreen,
        showBullets: galleryImages.length > 10 || !isLargeScreen,
        showThumbnails: galleryImages.length > 0,
        onScreenChange: handleOnChangeScreen
    };

    const galleryProps = Object.assign(
        defaultGalleryProps,
        additionalGalleryProps
    );

    return (
        <div className={classes.root}>
            <div
                className={cb(classes.imageContainer, {
                    'has-moreviews': galleryImages.length > 0
                })}
            >
                <ImageGallery {...galleryProps} />
            </div>
        </div>
    );
};

export default ProductImageCarousel;
