import { useCarousel } from '@magento/pagebuilder/lib/ContentTypes/Products/Carousel/useCarousel';
import { useStyle } from '@magento/venia-ui/lib/classify';
import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SlickSlider from 'react-slick';
import useRelatedProducts from '../talons/useRelatedProducts';
import { GalleryShimmer } from '@magento/venia-ui/lib/components/Gallery';
import defaultClasses from './relatedProducts.module.css';

const RelatedProducts = props => {
    const { sku } = props;
    const { relatedProducts, loading } = useRelatedProducts({
        sku: sku
    });
    const { storeConfig } = useCarousel();
    const classes = useStyle(defaultClasses, props.classes);

    const slidesToShow = 4;
    const slidesToScroll = 1;
    const settings = {
        slidesToShow,
        slidesToScroll,
        infinite: false,
        responsive: [
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    };
    if (loading)
        return (
            <GalleryShimmer
                slidesToShow={slidesToShow}
                appearance={'carousel'}
            />
        );

    if (!relatedProducts || !relatedProducts.length) return null;

    const galleryItems = relatedProducts.map((item, index) => {
        return (
            <GalleryItem key={index} item={item} storeConfig={storeConfig} />
        );
    });

    return (
        <>
            {relatedProducts.length > 0 && (
                <div className={classes.root}>
                    <h3 className={classes.title}>
                        <FormattedMessage
                            id={'productFullDetail.relatedProducts'}
                            defaultMessage={'Related Products'}
                        />
                    </h3>
                    <div className={classes.products}>
                        <SlickSlider {...settings}>{galleryItems}</SlickSlider>
                    </div>
                </div>
            )}
        </>
    );
};

RelatedProducts.propTypes = {};

export default RelatedProducts;
