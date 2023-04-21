import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import Rating from '@tigrensolutions/quick-view/src/components/Rating';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productDetail.module.css';

const ProductDetail = props => {
    const { product, selectedVariant, productDetails } = props;
    const { formatMessage } = useIntl();

    const { name } = product;

    const classes = useStyle(defaultClasses, props.classes);

    const productData = (selectedVariant && selectedVariant.product) || product;

    return (
        <>
            <div className={classes.top}>
                <div className={classes.brand}>
                    <span>
                        {formatMessage({
                            id: 'productFullDetail.brand',
                            defaultMessage: 'Brand: '
                        })}
                    </span>
                    <span className={classes.value}>
                        {(productDetails.brand && productDetails.brand.value) ||
                            'N/A'}
                    </span>
                </div>

                <span className={classes.sku}>
                    <FormattedMessage
                        id={'productFulLDetail.sku'}
                        defaultMessage={'SKU: '}
                    />
                    {': '}
                    {productDetails.sku}
                </span>
            </div>
            <span className={classes.productName}>{name}</span>
            <div className={classes.rating}>
                <Rating
                    value={productDetails.rating.summary / 5 / 4}
                    percent={productDetails.rating.summary}
                />
                <span>
                    <FormattedMessage
                        id={'productFulLDetail.reviewCount'}
                        defaultMessage={'{count} review(s)'}
                        values={{
                            count: productDetails.rating.count
                        }}
                    />
                </span>
            </div>
            <div className={classes.price}>
                <Price
                    type={'full'}
                    product={
                        (selectedVariant && selectedVariant.product) || product
                    }
                    value={
                        productData.price_range.maximum_price.regular_price
                            .value
                    }
                    currencyCode={
                        productData.price_range.maximum_price.regular_price
                            .currency
                    }
                />
            </div>
        </>
    );
};

export default ProductDetail;
