import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Heart } from 'react-feather';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useProduct } from '@tigrensolutions/core/src/talons/CartPage/ProductListing/useProduct';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Price from '@magento/venia-ui/lib/components/Price';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Image from '@magento/venia-ui/lib/components/Image';
import ProductOptions from '@magento/venia-ui/lib/components/LegacyMiniCart/productOptions';
import AddToListButton from '@tigrensolutions/core/src/components/Wishlist/AddToListButton';
import Quantity from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';
import RemoveCart from '@tigrensolutions/core/src/components/CartPage/ProductListing/RemoveCart';

import defaultClasses from '@tigrensolutions/core/src/components/CartPage/ProductListing/product.module.css';
import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';
import ProductMessage from '@tigrensolutions/core/src/components/CartPage/ProductListing/productMessage';

import { CartPageFragment } from '@magento/peregrine/lib/talons/CartPage/cartPageFragments.gql.js';
import { AvailableShippingMethodsCartFragment } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/ShippingMethods/shippingMethodsFragments.gql.js';
import { useWindowSize } from '@magento/peregrine';

const IMAGE_SIZE = 100;

const HeartIcon = <Icon size={16} src={Heart} />;

const Product = props => {
    const { item } = props;

    const { formatMessage } = useIntl();
    const { isLargeMobile } = useWindowSize();
    const talonProps = useProduct({
        operations: {
            removeItemMutation: REMOVE_ITEM_MUTATION,
            updateItemQuantityMutation: UPDATE_QUANTITY_MUTATION
        },
        ...props
    });

    const {
        addToWishlistProps,
        errorMessage,
        handleEditItem,
        handleRemoveFromCart,
        handleUpdateItemQuantity,
        isEditable,
        product,
        isProductUpdating,
        handleRemove,
        handleCancelRemove,
        isOpenRemove
    } = talonProps;

    const {
        currency,
        image,
        name,
        options,
        quantity,
        stockStatus,
        unitPrice,
        urlSuffix,
        finalValue,
        productType,
        sku
    } = product;

    const classes = useStyle(defaultClasses, props.classes);

    const itemClassName = isProductUpdating
        ? classes.item_disabled
        : classes.item;

    const editItemSection = isEditable ? (
        <button className={classes.edit} onClick={handleEditItem}>
            <span>
                {formatMessage({
                    id: 'product.editItem',
                    defaultMessage: 'Edit item'
                })}
            </span>
        </button>
    ) : null;

    const productUrl = getProductUrl({
        product: item?.product,
        url_suffix: urlSuffix
    });
    const itemLink = useMemo(() => {
        return resourceUrl(`/${productUrl}`);
    }, [productUrl]);

    const stockStatusMessage =
        stockStatus === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'product.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';
    const specialClass =
        !!finalValue && finalValue > unitPrice
            ? classes.specialPrice
            : classes.productPrice;

    return (
        <>
            <li className={`${classes.root} ${itemClassName}`}>
                {isLargeMobile && (
                    <Link to={itemLink} className={classes.imageContainer}>
                        <Image
                            alt={name}
                            classes={{
                                root: classes.imageRoot,
                                image: classes.image
                            }}
                            width={IMAGE_SIZE}
                            resource={image}
                        />
                    </Link>
                )}
                <div className={classes.product}>
                    {!isLargeMobile && (
                        <Link to={itemLink} className={classes.imageContainer}>
                            <Image
                                alt={name}
                                classes={{
                                    root: classes.imageRoot,
                                    image: classes.image
                                }}
                                width={IMAGE_SIZE}
                                resource={image}
                            />
                        </Link>
                    )}
                    <div className={classes.details}>
                        <div className={classes.sku}>
                            <span>
                                {formatMessage({
                                    id: 'global.sku',
                                    defaultMessage: 'SKU'
                                })}
                                {': '}
                            </span>
                            {sku}
                        </div>
                        <div className={classes.name}>
                            <Link to={itemLink}>{name}</Link>
                        </div>
                        <ProductOptions
                            options={options}
                            classes={{
                                options: classes.options,
                                optionLabel: classes.optionLabel
                            }}
                        />
                        <span className={classes.stockStatusMessage}>
                            {stockStatusMessage}
                        </span>
                        <ProductMessage item={item} />
                        <div className={classes.action}>
                            <AddToListButton
                                {...addToWishlistProps}
                                icon={HeartIcon}
                            />
                            {editItemSection}
                        </div>
                        <span className={classes.errorText}>
                            {errorMessage}
                        </span>
                    </div>
                </div>
                <div className={classes.price}>
                    <div className={specialClass}>
                        <Price
                            value={unitPrice}
                            currencyCode={currency || 'USD'}
                        />
                    </div>
                    {!!finalValue && unitPrice < finalValue && (
                        <div className={classes.oldPrice}>
                            <Price
                                value={finalValue}
                                currencyCode={currency || 'USD'}
                            />
                        </div>
                    )}
                </div>
                <div className={classes.quantity}>
                    <Quantity
                        itemId={item.id}
                        initialValue={quantity}
                        onChange={handleUpdateItemQuantity}
                    />
                </div>
                <div className={classes.priceTotal}>
                    <Price
                        currencyCode={currency}
                        value={unitPrice * quantity}
                    />
                </div>
                <div className={classes.delete}>
                    <button className={classes.remove} onClick={handleRemove}>
                        <span>
                            {formatMessage({
                                id: 'global.removeButton',
                                defaultMessage: 'remove'
                            })}
                        </span>
                    </button>
                </div>
            </li>
            <RemoveCart
                onCancel={handleCancelRemove}
                onConfirm={handleRemoveFromCart}
                isOpen={isOpenRemove}
                title={formatMessage(
                    {
                        id: 'RemoveCart.title',
                        defaultMessage:
                            'You want to delete this product.<span>Out of the basket?</span>'
                    },
                    { span: str => <span>{str}</span> }
                )}
            />
        </>
    );
};

export default Product;

export const REMOVE_ITEM_MUTATION = gql`
    mutation removeItem($cartId: String!, $itemId: ID!) {
        removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $itemId })
            @connection(key: "removeItemFromCart") {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;

export const UPDATE_QUANTITY_MUTATION = gql`
    mutation updateItemQuantity(
        $cartId: String!
        $itemId: ID!
        $quantity: Float!
    ) {
        updateCartItems(
            input: {
                cart_id: $cartId
                cart_items: [{ cart_item_uid: $itemId, quantity: $quantity }]
            }
        ) @connection(key: "updateCartItems") {
            cart {
                id
                ...CartPageFragment
                ...AvailableShippingMethodsCartFragment
            }
        }
    }
    ${CartPageFragment}
    ${AvailableShippingMethodsCartFragment}
`;
