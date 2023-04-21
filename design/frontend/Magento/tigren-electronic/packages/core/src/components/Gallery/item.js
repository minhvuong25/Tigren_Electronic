import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Info } from 'react-feather';
import { bool, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

import { UNCONSTRAINED_SIZE_KEY } from '@magento/peregrine/lib/talons/Image/useImage';
import { useGalleryItem } from '@magento/peregrine/lib/talons/Gallery/useGalleryItem';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import GalleryItemShimmer from '@magento/venia-ui/lib/components/Gallery/item.shimmer';
import defaultClasses from './item.module.css';
import WishlistGalleryButton from '@tigrensolutions/core/src/components/Wishlist/AddToListButton';

import AddToCartbutton from '@tigrensolutions/core/src/components/Gallery/addToCartButton';

import Price from '@magento/venia-ui/lib/components/Price';
import getProductUrl from '@tigrensolutions/base/helpers/getProductUrl';

// The placeholder image is 4:5, so we should make sure to size our product
// images appropriately.
const IMAGE_WIDTH = 184;
const IMAGE_HEIGHT = 184;

// Gallery switches from two columns to three at 640px.
const IMAGE_WIDTHS = new Map()
    .set(640, IMAGE_WIDTH)
    .set(UNCONSTRAINED_SIZE_KEY, 184);

const GalleryItem = props => {
    const { isCategoryPage = false, productListMode } = props;
    const {
        handleLinkClick,
        item,
        wishlistButtonProps,
        isSupportedProductType
    } = useGalleryItem(props);
    const { formatMessage } = useIntl();

    const { storeConfig } = props;

    const productUrlSuffix = storeConfig && storeConfig.product_url_suffix;

    const classes = useStyle(defaultClasses, props.classes);

    if (!item) {
        return <GalleryItemShimmer classes={classes} />;
    }

    const { name, small_image } = item;
    const { url: smallImageURL } = small_image;
    const productUrl = getProductUrl({
        product: item,
        url_suffix: productUrlSuffix
    });
    const productLink = resourceUrl(`/${productUrl}`);

    const wishlistButton = wishlistButtonProps ? (
        <WishlistGalleryButton
            {...wishlistButtonProps}
            buttonText={() =>
                formatMessage({
                    id: 'AddToListButton.wishlist',
                    defaultMessage: 'Wishlist'
                })
            }
        />
    ) : null;

    const addButton = isSupportedProductType ? (
        <AddToCartbutton item={item} isShowQuantity={true} />
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'galleryItem.unavailableProduct'}
                    defaultMessage={'Currently unavailable for purchase.'}
                />
            </p>
        </div>
    );

    const rootClass = isCategoryPage ? classes.categoryRoot : classes.root;

    let itemLayout;
    switch (productListMode) {
        case 'grid':
            itemLayout = classes.grid;
            break;
        case 'list':
            itemLayout = classes.list;
            break;
        default:
            itemLayout = classes.grid;
            break;
    }

    return (
        <div
            className={`${rootClass} ${itemLayout}`}
            aria-live="polite"
            aria-busy="false"
        >
            <Link
                onClick={handleLinkClick}
                to={productLink}
                className={classes.images}
            >
                <Image
                    alt={name}
                    classes={{
                        image: classes.image,
                        loaded: classes.imageLoaded,
                        notLoaded: classes.imageNotLoaded,
                        root: classes.imageContainer
                    }}
                    height={IMAGE_HEIGHT}
                    resource={smallImageURL}
                    widths={IMAGE_WIDTHS}
                />
            </Link>
            <div className={classes.info}>
                <div className={classes.top}>
                    <Link
                        onClick={handleLinkClick}
                        to={productLink}
                        className={classes.name}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: name
                            }}
                        />
                    </Link>
                    <div className={`${classes.price}`}>
                        <Price
                            product={item}
                            currencyCode={
                                (item &&
                                    item.price_range.maximum_price.regular_price
                                        .currency) ||
                                {}
                            }
                            value={
                                item &&
                                item.price_range.maximum_price.regular_price
                                    .value
                            }
                            type={'full'}
                        />
                    </div>
                </div>
                <div className={classes.bottom}>
                    <div className={classes.actionsContainer}>{addButton}</div>
                    <div className={classes.actionsBottom}>
                        {wishlistButton}
                    </div>
                </div>
            </div>
        </div>
    );
};

GalleryItem.propTypes = {
    classes: shape({
        image: string,
        imageLoaded: string,
        imageNotLoaded: string,
        imageContainer: string,
        images: string,
        name: string,
        price: string,
        root: string
    }),
    isCategoryPage: bool,
    item: shape({
        id: number.isRequired,
        uid: string.isRequired,
        name: string.isRequired,
        small_image: shape({
            url: string.isRequired
        }),
        stock_status: string.isRequired,
        type_id: string.isRequired,
        url_key: string.isRequired,
        url_suffix: string,
        sku: string.isRequired,
        price_range: shape({
            maximum_price: shape({
                regular_price: shape({
                    value: number.isRequired,
                    currency: string.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    }),
    storeConfig: shape({
        magento_wishlist_general_is_enabled: string.isRequired,
        product_url_suffix: string.isRequired
    })
};

export default GalleryItem;
