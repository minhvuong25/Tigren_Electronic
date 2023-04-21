import { useStyle } from '@magento/venia-ui/lib/classify';
import GalleryItem from '@magento/venia-ui/lib/components/Gallery/item';
import React from 'react';
import SlickSlider from 'react-slick';
import { GalleryShimmer } from '@magento/venia-ui/lib/components/Gallery';
import defaultClasses from './upSellProducts.module.css';
import useUpSellProducts from '../talons/useUpSellProducts';
import { FormattedMessage } from 'react-intl';
import defaultOperations from '@magento/peregrine/lib/talons/Gallery/gallery.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useQuery } from '@apollo/client';

const UpSellProducts = props => {
    const { sku } = props;
    const operations = mergeOperations(defaultOperations, props.operations);
    const { upSellProducts, loading } = useUpSellProducts({
        sku: sku
    });

    const { data } = useQuery(operations.getStoreConfigQuery, {
        fetchPolicy: 'cache-and-network'
    });
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

    if (!upSellProducts || !upSellProducts.length) return null;

    const storeConfig = data?.storeConfig;
    const galleryItems = upSellProducts.map((item, index) => {
        return (
            <GalleryItem key={index} item={item} storeConfig={storeConfig} />
        );
    });

    return (
        <>
            {upSellProducts.length > 0 && (
                <div className={classes.root}>
                    <h3 className={classes.title}>
                        <FormattedMessage
                            id={'productFullDetail.upSellProducts'}
                            defaultMessage={
                                'We found other products you might like!'
                            }
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

UpSellProducts.propTypes = {};

export default UpSellProducts;
