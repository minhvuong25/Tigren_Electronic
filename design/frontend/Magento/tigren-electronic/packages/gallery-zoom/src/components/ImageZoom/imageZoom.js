import React from 'react';

import Image from '@magento/venia-ui/lib/components/Image';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '../ProductImageCarousel/carousel.module.css';

const ImageZoom = props => {
    const { isFullScreen, fullSrc, optimizedSrc } = props;

    const classes = useStyle(defaultClasses, props.classes);

    if (!isFullScreen) {
        return (
            <Image
                alt={''}
                classes={{
                    image: classes.image,
                    root: classes.imageContainer
                }}
                width={'100%'}
                height={'auto'}
                src={optimizedSrc}
            />
        );
    }

    const imageStyle = {
        minWidth: '100vw'
    };

    return (
        <TransformWrapper
            defaultScale={1}
            defaultPositionX={2000}
            defaultPositionY={100}
            wheel={{
                step: 70
            }}
        >
            {({ zoomIn, zoomOut }) => (
                <>
                    <div className="image-gallery-custom-action">
                        <button
                            className="zoom-in"
                            onClick={zoomIn}
                            type="button"
                        />
                        <button
                            className="zoom-out"
                            onClick={zoomOut}
                            type="button"
                        />
                    </div>
                    <div className="image-gallery-zoom-main">
                        <TransformComponent>
                            <Image
                                alt={''}
                                classes={{
                                    image: classes.image,
                                    root: classes.imageContainer
                                }}
                                style={imageStyle}
                                src={fullSrc}
                            />
                        </TransformComponent>
                    </div>
                </>
            )}
        </TransformWrapper>
    );
};

export default ImageZoom;
