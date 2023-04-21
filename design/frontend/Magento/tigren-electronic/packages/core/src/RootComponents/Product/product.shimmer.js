import React, { Fragment, useMemo } from 'react';
import { shape, string } from 'prop-types';
import Shimmer from '@magento/venia-ui/lib/components/Shimmer';
import { BreadcrumbShimmer } from '@tigrensolutions/core/src/components/Breadcrumbs';
import defaultClasses from '@tigrensolutions/core/src/components/ProductFullDetail/productFullDetail.module.css';
import CarouselShimmer from '@tigrensolutions/gallery-zoom/src/components/ProductImageCarousel/carousel.shimmer';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import { useStyle } from '@magento/venia-ui/lib/classify';

const GALLERY_ITEMS_COUNT = 2;

const ProductShimmer = props => {
    const { productType } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const options = useMemo(() => {
        if (productType && productType.includes('Configurable')) {
            return <ProductOptionsShimmer />;
        }

        return null;
    }, [productType]);

    return (
        <Fragment>
            <BreadcrumbShimmer />
            <div className={classes.root}>
                <section className={classes.top}>
                    <Shimmer width="20%" height={1} key="product-brand" />
                    <Shimmer width="20%" height={1} key="product-sku" />
                </section>
                <section className={classes.title}>
                    <Shimmer width="100%" height={3} key="product-name" />
                </section>
                <section className={classes.imageCarousel}>
                    <CarouselShimmer />
                </section>
                <section className={classes.rating}>
                    <Shimmer width="30%" height={1} key="product-rating" />
                </section>

                <section
                    className={classes.price}
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <Shimmer width="30%" height={2} key="product-price" />
                </section>

                <section className={classes.options}>{options}</section>
                <section
                    className={classes.actions}
                    style={{
                        marginTop: '30px'
                    }}
                >
                    <Shimmer type="button" key="add-to-cart" />
                    <Shimmer type="button" key="add-to-compare" />
                </section>
            </div>

            <div className={classes.information}>
                <div className={classes.left}>
                    <h3 className={classes.headingTitle}>
                        <Shimmer
                            width="30%"
                            height={2}
                            key="information-tile"
                        />
                    </h3>
                    <div className={classes.description}>
                        <Shimmer
                            width="100%"
                            height={10}
                            key="information-description"
                        />
                    </div>

                    <h3 className={classes.headingTitle}>
                        <Shimmer
                            width="30%"
                            height={2}
                            key="information-tile"
                        />
                    </h3>
                    <div className={classes.description}>
                        <Shimmer
                            width="100%"
                            height={20}
                            key="information-description"
                        />
                    </div>
                </div>
                <div className={classes.left}>
                    {new Array(GALLERY_ITEMS_COUNT)
                        .fill(null)
                        .map((abc, indx) => (
                            <Shimmer
                                width="100%"
                                height={20}
                                key={`gallery-item-${indx}`}
                                style={{
                                    marginBottom: '10px'
                                }}
                            />
                        ))}
                </div>
            </div>
        </Fragment>
    );
};

ProductShimmer.defaultProps = {
    classes: {}
};

ProductShimmer.propTypes = {
    productType: string.isRequired,
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        root: string,
        title: string,
        unavailableContainer: string
    })
};

export default ProductShimmer;
