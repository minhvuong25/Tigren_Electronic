import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { string, number, shape, func, arrayOf, oneOf } from 'prop-types';
import { Trash2 as DeleteIcon } from 'react-feather';
import { Link } from 'react-router-dom';

import Price from '@magento/venia-ui/lib/components/Price';
import { useItem } from '@magento/peregrine/lib/talons/MiniCart/useItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import Image from '@magento/venia-ui/lib/components/Image';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { useStyle } from '@magento/venia-ui/lib/classify';
import configuredVariant from '@magento/peregrine/lib/util/configuredVariant';

import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';
import ProductMessage from '@tigrensolutions/core/src/components/CartPage/ProductListing/productMessage';

import defaultClasses from './item.module.css';

const Item = props => {
    const {
        classes: propClasses,
        product,
        uid,
        quantity,
        configurable_options,
        handleRemoveItem,
        prices,
        closeMiniCart,
        configurableThumbnailSource,
        storeUrlSuffix
    } = props;

    const { formatMessage } = useIntl();
    const classes = useStyle(defaultClasses, propClasses);
    const productUrl = getProductUrl({ product, url_suffix: storeUrlSuffix });
    const itemLink = useMemo(() => {
        return resourceUrl(`/${productUrl}`);
    }, [productUrl]);
    const stockStatusText =
        product.stock_status === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'productList.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';

    const { isDeleting, removeItem } = useItem({
        uid,
        handleRemoveItem
    });

    const rootClass = isDeleting ? classes.root_disabled : classes.root;
    const configured_variant = configuredVariant(configurable_options, product);
    const price =
        prices &&
        (prices.price_including_tax
            ? prices.price_including_tax
            : prices.price);

    const finalPrice =
        product &&
        product.price &&
        product.price.regularPrice &&
        product.price.regularPrice.amount
            ? product.price.regularPrice.amount
            : null;

    const specialClass =
        finalPrice && price && price.value < finalPrice.value
            ? classes.specialPrice
            : classes.productPrice;

    return (
        <div className={rootClass}>
            <Link
                className={classes.thumbnailContainer}
                to={itemLink}
                onClick={closeMiniCart}
            >
                <Image
                    alt={product.name}
                    classes={{
                        root: classes.thumbnail
                    }}
                    width={100}
                    resource={
                        configurableThumbnailSource === 'itself' &&
                        configured_variant
                            ? configured_variant.thumbnail.url
                            : product.thumbnail.url
                    }
                />
            </Link>
            <Link
                className={classes.name}
                to={itemLink}
                onClick={closeMiniCart}
            >
                {product.name}
            </Link>
            <ProductOptions
                options={configurable_options}
                classes={{
                    options: classes.options
                }}
            />
            <span className={classes.quantity}>
                <FormattedMessage
                    id={'productList.quantity'}
                    defaultMessage={'Qty :'}
                    values={{ quantity }}
                />
            </span>
            <div className={classes.price}>
                <div className={specialClass}>
                    <Price currencyCode={price.currency} value={price.value} />
                </div>
                {finalPrice && price && price.value < finalPrice.value && (
                    <div className={classes.oldPrice}>
                        <Price
                            value={finalPrice.value}
                            currencyCode={finalPrice.currency || 'USD'}
                        />
                    </div>
                )}
            </div>
            <span className={classes.stockStatus}>{stockStatusText}</span>
            <div className={classes.message}>
                <ProductMessage item={props} />
            </div>
            <button
                onClick={removeItem}
                type="button"
                className={classes.deleteButton}
                disabled={isDeleting}
            >
                <Icon
                    size={16}
                    src={DeleteIcon}
                    classes={{
                        icon: classes.editIcon
                    }}
                />
            </button>
        </div>
    );
};

export default Item;

Item.propTypes = {
    classes: shape({
        root: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        editButton: string,
        editIcon: string
    }),
    product: shape({
        name: string,
        thumbnail: shape({
            url: string
        })
    }),
    id: string,
    quantity: number,
    configurable_options: arrayOf(
        shape({
            id: number,
            option_label: string,
            value_id: number,
            value_label: string
        })
    ),
    handleRemoveItem: func,
    prices: shape({
        price: shape({
            value: number,
            currency: string
        })
    }),
    configured_variant: shape({
        thumbnail: shape({
            url: string
        })
    }),
    configurableThumbnailSource: oneOf(['parent', 'itself'])
};
