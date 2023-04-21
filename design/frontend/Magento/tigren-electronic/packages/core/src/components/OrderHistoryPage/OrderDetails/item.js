import React, { useMemo } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useOrderHistoryContext } from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';

import { useStyle } from '@magento/venia-ui/lib/classify';
import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Price from '@magento/venia-ui/lib/components/Price';
import defaultClasses from './item.module.css';
import PlaceholderImage from '@magento/venia-ui/lib/components/Image/placeholderImage';

const Item = props => {
    const {
        product_name,
        product_sale_price,
        product_url_key,
        quantity_ordered,
        selected_options,
        thumbnail,
        sku,
        isSuccess
    } = props;
    const { currency, value: unitPrice } = product_sale_price;

    const orderHistoryState = useOrderHistoryContext();
    let productURLSuffix = '.html';
    if (orderHistoryState) {
        productURLSuffix = orderHistoryState.productURLSuffix;
    }
    const itemLink = `/${product_url_key}${productURLSuffix}`;
    const mappedOptions = useMemo(
        () =>
            selected_options.map(option => ({
                option_label: option.label,
                value_label: option.value
            })),
        [selected_options]
    );
    const classes = useStyle(defaultClasses, props.classes);

    const thumbnailProps = {
        alt: product_name,
        classes: { root: classes.thumbnail },
        width: 62
    };
    const thumbnailElement = thumbnail ? (
        <img src={thumbnail.url} loading={'lazy'} alt={'product_name'} />
    ) : (
        <PlaceholderImage {...thumbnailProps} />
    );

    const rootClass = isSuccess ? classes.rootSuccess : classes.root;

    return (
        <div className={rootClass}>
            <Link className={classes.thumbnailContainer} to={itemLink}>
                {thumbnailElement}
            </Link>
            <div className={classes.wrapContent}>
                <div className={classes.wrapName}>
                    <div>
                        <h6 className={classes.sku}>
                            <FormattedMessage
                                id={'productDetail.skuNumber'}
                                defaultMessage={'SKU: {sku}'}
                                values={{
                                    sku
                                }}
                            />
                        </h6>
                        <div className={classes.nameContainer}>
                            <Link to={itemLink}>{product_name}</Link>
                        </div>
                        <ProductOptions
                            options={mappedOptions}
                            classes={{
                                options: classes.options
                            }}
                        />
                    </div>
                </div>
                <div className={`${classes.priceItem} ${classes.price}`}>
                    <Price currencyCode={currency} value={unitPrice} />
                </div>
                <span className={classes.quantity}>
                    <FormattedMessage
                        id="orderHistoryPage.quantity"
                        defaultMessage="Qty: {quantity}"
                        values={{
                            quantity: quantity_ordered
                        }}
                    />
                </span>

                <div className={classes.price}>
                    <Price
                        currencyCode={currency}
                        value={unitPrice * quantity_ordered}
                    />
                </div>
            </div>
        </div>
    );
};

export default Item;

Item.propTypes = {
    classes: shape({
        root: string,
        thumbnailContainer: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        buyAgainButton: string
    }),
    product_name: string.isRequired,
    product_sale_price: shape({
        currency: string,
        value: number
    }).isRequired,
    product_url_key: string.isRequired,
    quantity_ordered: number.isRequired,
    selected_options: arrayOf(
        shape({
            label: string,
            value: string
        })
    ).isRequired,
    thumbnail: shape({
        url: string
    })
};
