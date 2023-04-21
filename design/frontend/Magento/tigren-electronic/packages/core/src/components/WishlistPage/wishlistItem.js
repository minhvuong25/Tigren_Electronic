import React, { useEffect, useMemo } from 'react';
import { Trash2 } from 'react-feather';
import { useIntl } from 'react-intl';
import { useToasts } from '@magento/peregrine';
import { useWishlistItem } from '@tigrensolutions/core/src/talons/WishlistPage/useWishlistItem';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Image from '@magento/venia-ui/lib/components/Image';
import { Link } from 'react-router-dom';

import defaultClasses from './wishlistItem.module.css';
import ProductPrice from '@tigrensolutions/base/src/components/ProductPrice';
import Price from '@magento/venia-ui/lib/components/Price';

const WishlistItem = props => {
    const { item } = props;

    const { configurable_options: configurableOptions = [], product } = item;
    const { name, stock_status: stockStatus } = product;

    const talonProps = useWishlistItem(props);
    const {
        addToCartButtonProps,
        handleRemoveProductFromWishlist,
        hasError,
        isRemovalInProgress,
        isSupportedProductType,
        productLink,
        isInStock
    } = talonProps;

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (hasError) {
            addToast({
                type: 'error',
                message: formatMessage({
                    id: 'wishlistItem.addToCartError',
                    defaultMessage:
                        'Something went wrong. Please refresh and try again.'
                }),
                timeout: 5000
            });
        }
    }, [addToast, formatMessage, hasError]);

    const classes = useStyle(defaultClasses, props.classes);

    const optionElements = useMemo(() => {
        return configurableOptions.map(option => {
            const {
                id,
                option_label: optionLabel,
                value_label: valueLabel
            } = option;

            const optionString = `${optionLabel} : ${valueLabel}`;

            return (
                <span className={classes.option} key={id}>
                    {optionString}
                </span>
            );
        });
    }, [classes.option, configurableOptions]);

    const imageProps = {
        classes: {
            image:
                stockStatus === 'OUT_OF_STOCK'
                    ? classes.image_disabled
                    : classes.image
        },
        ...talonProps.imageProps
    };

    const removeProductAriaLabel = formatMessage({
        id: 'wishlistItem.removeAriaLabel',
        defaultMessage: 'Remove Product from wishlist'
    });

    const rootClass = isRemovalInProgress
        ? classes.root_disabled
        : classes.root;

    const addToCart = useMemo(() => {
        if (isSupportedProductType) {
            return (
                <button className={classes.addToCart} {...addToCartButtonProps}>
                    {isInStock
                        ? formatMessage({
                              id: 'wishlistItem.addToCart',
                              defaultMessage: 'Add to Cart'
                          })
                        : formatMessage({
                              id: 'addToCartButton.itemOutOfStock',
                              defaultMessage: 'Out of stock'
                          })}
                </button>
            );
        } else {
            return null;
        }
    }, [isInStock, addToCartButtonProps, isSupportedProductType]);

    return (
        <div className={rootClass}>
            <Link to={productLink} className={classes.linkContainer}>
                <Image {...imageProps} />

                <div className={classes.actionWrap}>
                    <span className={classes.name}>{name}</span>
                </div>

                {!isInStock ? (
                    <div className={classes.outOfStockMessage}>
                        <span>
                            {formatMessage({
                                id: 'addToCartButton.itemOutOfStock',
                                defaultMessage: 'Out of stock'
                            })}
                        </span>
                    </div>
                ) : null}
            </Link>
            <div className={classes.priceContainer}>
                <Price
                    product={(item && item.product) || {}}
                    currencyCode={
                        (item &&
                            item.product.price_range.maximum_price.regular_price
                                .currency) ||
                        {}
                    }
                    value={
                        item &&
                        item.product.price_range.maximum_price.regular_price
                            .value
                    }
                    type={'full'}
                />
            </div>
            {optionElements}
            <div className={classes.space} />
            <div className={classes.actionContainer}>
                {addToCart}
                <button
                    className={classes.deleteItem}
                    onClick={handleRemoveProductFromWishlist}
                    aria-label={removeProductAriaLabel}
                >
                    <Icon size={16} src={Trash2} /> {removeProductAriaLabel}
                </button>
            </div>
        </div>
    );
};

export default WishlistItem;
