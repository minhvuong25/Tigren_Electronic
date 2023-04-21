import React, { Fragment, Suspense, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Info } from 'react-feather';

import { useProductFullDetail } from '@tigrensolutions/core/src/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';
import Carousel from '@magento/venia-ui/lib/components/ProductImageCarousel';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { QuantityFields } from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';
import RichContent from '@magento/venia-ui/lib/components/RichContent/richContent';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';
import SocialShare from '@tigrensolutions/core/src/components/SocialShare';
import ProductAttributes from '@tigrensolutions/core/src/components/ProductFullDetail/ProductAttributes';
import Price from '@magento/venia-ui/lib/components/Price';
import Image from '@magento/venia-ui/lib/components/Image';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './productFullDetail.module.css';

const WishlistButton = React.lazy(() =>
    import('@tigrensolutions/core/src/components/Wishlist/AddToListButton')
);
const Options = React.lazy(() =>
    import('@magento/venia-ui/lib/components/ProductOptions')
);

// Correlate a GQL error message to a field. GQL could return a longer error
// string but it may contain contextual info such as product id. We can use
// parts of the string to check for which field to apply the error.
const ERROR_MESSAGE_TO_FIELD_MAPPING = {
    'The requested qty is not available': 'quantity',
    'Product that you are trying to add is not available.': 'quantity',
    "The product that was requested doesn't exist.": 'quantity'
};

// Field level error messages for rendering.
const ERROR_FIELD_TO_MESSAGE_MAPPING = {
    quantity: 'The requested quantity is not available.'
};

const ProductFullDetail = props => {
    const { product } = props;

    const talonProps = useProductFullDetail({ product });

    const {
        breadcrumbCategoryId,
        errorMessage,
        selectedVariant,
        storeCurrency,
        optionCodes,
        inStockVariants,
        optionSelections,
        handleAddToCart,
        handleSelectionChange,
        isOutOfStock,
        isAddToCartDisabled,
        isSupportedProductType,
        mediaGalleryEntries,
        productDetails,
        wishlistButtonProps
    } = talonProps;
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={<ProductOptionsShimmer />}>
            <Options
                onSelectionChange={handleSelectionChange}
                optionSelections={optionSelections}
                optionCodes={optionCodes}
                inStockVariants={inStockVariants}
                options={product.configurable_options}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    // Fill a map with field/section -> error.
    const errors = new Map();
    if (errorMessage) {
        Object.keys(ERROR_MESSAGE_TO_FIELD_MAPPING).forEach(key => {
            if (errorMessage.includes(key)) {
                const target = ERROR_MESSAGE_TO_FIELD_MAPPING[key];
                const message = ERROR_FIELD_TO_MESSAGE_MAPPING[target];
                errors.set(target, message);
            }
        });

        // Handle cases where a user token is invalid or expired. Preferably
        // this would be handled elsewhere with an error code and not a string.
        if (errorMessage.includes('The current user cannot')) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorToken',
                        defaultMessage:
                            'There was a problem with your cart. Please sign in again and try adding the item once more.'
                    })
                )
            ]);
        }

        // Handle cases where a cart wasn't created properly.
        if (
            errorMessage.includes('Variable "$cartId" got invalid value null')
        ) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorCart',
                        defaultMessage:
                            'There was a problem with your cart. Please refresh the page and try adding the item once more.'
                    })
                )
            ]);
        }

        // An unknown error should still present a readable message.
        if (!errors.size && errors.size) {
            errors.set('form', [
                new Error(
                    formatMessage({
                        id: 'productFullDetail.errorUnknown',
                        defaultMessage:
                            'Could not add item to cart. Please check required options and try again.'
                    })
                )
            ]);
        }
    }

    const addToCartMessage = useMemo(() => {
        if (isOutOfStock) {
            return (
                <FormattedMessage
                    id="productFullDetail.itemOutOfStock"
                    defaultMessage="Out of Stock"
                />
            );
        }

        return (
            <FormattedMessage
                id="productFullDetail.addItemToCart"
                defaultMessage="Add to Cart"
            />
        );
    }, [productDetails, isOutOfStock]);

    const cartActionContent = isSupportedProductType ? (
        <Button disabled={isAddToCartDisabled} priority={'high'} type="submit">
            {addToCartMessage}
        </Button>
    ) : (
        <div className={classes.unavailableContainer}>
            <Info />
            <p>
                <FormattedMessage
                    id={'productFullDetail.unavailableProduct'}
                    defaultMessage={
                        'This product is currently unavailable for purchase.'
                    }
                />
            </p>
        </div>
    );

    const tierPrice = useMemo(() => {
        if (productDetails.tierPrices && productDetails.tierPrices.length > 0) {
            return (
                <section className={classes.tierPrices}>
                    <p className={classes.heading}>
                        <FormattedMessage
                            id={'productFullDetail.tierPriceTitle'}
                            defaultMessage={'Special price for you'}
                        />
                    </p>

                    <ul>
                        {productDetails.tierPrices.map(price => {
                            const {
                                qty,
                                price: discountPrice,
                                percentage
                            } = price;

                            return (
                                <li key={price.item_id}>
                                    <span>
                                        <FormattedMessage
                                            id={
                                                'productFullDetail.tierPriceItem'
                                            }
                                            defaultMessage={
                                                'Buy {qty} items, get a {percentage}% discount, the price is <priceElement></priceElement> per piece.'
                                            }
                                            values={{
                                                qty,
                                                percentage,
                                                priceElement: () => {
                                                    return (
                                                        <Price
                                                            currencyCode={
                                                                storeCurrency
                                                            }
                                                            value={
                                                                discountPrice
                                                            }
                                                        />
                                                    );
                                                }
                                            }}
                                        />
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            );
        }
    });

    return (
        <Fragment>
            {breadcrumbs}
            <Form className={classes.root} onSubmit={handleAddToCart}>
                {mediaGalleryEntries.length > 0 ? (
                    <section className={classes.imageCarousel}>
                        <Carousel
                            images={mediaGalleryEntries}
                            additionalGalleryProps={{
                                thumbnailPosition: 'bottom',
                                showNav: true
                            }}
                            width={580}
                        />
                    </section>
                ) : (
                    <section className={classes.imageCarousel}>
                        <Image
                            alt={''}
                            src={product.small_image}
                            width={'100%'}
                        />
                    </section>
                )}
                <section className={classes.top}>
                    <p className={classes.brand}>
                        <FormattedMessage
                            id={'productFullDetail.brand'}
                            defaultMessage={'Brand: '}
                        />
                        <span>
                            {(productDetails.brand &&
                                productDetails.brand.value) ||
                                'N/A'}
                        </span>
                    </p>

                    <p className={classes.sku}>
                        <FormattedMessage
                            id={'productFullDetail.sku'}
                            defaultMessage={'SKU'}
                        />
                        {': '}
                        <span>{productDetails.sku}</span>
                    </p>
                </section>

                <section className={classes.title}>
                    <h1
                        className={classes.productName}
                        dangerouslySetInnerHTML={{
                            __html: productDetails.name
                        }}
                    />
                </section>

                {productDetails.shortDescription && (
                    <div className={classes.shortDescription}>
                        <RichContent html={productDetails.shortDescription} />
                    </div>
                )}

                <section className={classes.price}>
                    <Price
                        product={
                            (selectedVariant && selectedVariant.product) ||
                            product
                        }
                        currencyCode={
                            (selectedVariant &&
                                selectedVariant.product.price_range
                                    .maximum_price.regular_price.currency) ||
                            product.price_range.maximum_price.regular_price
                                .currency
                        }
                        value={
                            (selectedVariant &&
                                selectedVariant.product.price_range
                                    .maximum_price.regular_price.value) ||
                            product.price_range.maximum_price.regular_price
                                .value
                        }
                        type={'full'}
                    />
                </section>
                <FormError
                    classes={{
                        root: classes.formErrors
                    }}
                    errors={errors.get('form') || []}
                />

                {tierPrice}
                <section className={classes.options}>{options}</section>
                <section className={classes.quantity}>
                    <span className={classes.quantityTitle}>
                        <FormattedMessage
                            id={'global.quantity'}
                            defaultMessage={'Quantity'}
                        />
                    </span>
                    <QuantityFields min={1} />
                </section>
                <section className={classes.actions}>
                    {cartActionContent}
                </section>

                <section className={classes.moreActions}>
                    <Suspense fallback={null}>
                        <WishlistButton {...wishlistButtonProps} />
                    </Suspense>
                    <div className={classes.socialShare}>
                        <p>
                            <FormattedMessage
                                id={'global.share'}
                                defaultMessage={'Share'}
                            />
                            {': '}
                        </p>
                        <SocialShare shareUrl={window.location.href} />
                    </div>
                </section>
            </Form>

            <div className={classes.information}>
                <div className={classes.left}>
                    <h3 className={classes.headingTitle}>
                        <FormattedMessage
                            id={'productFullDetail.productDetails'}
                            defaultMessage={'Details'}
                        />
                    </h3>
                    <div className={classes.description}>
                        <RichContent html={productDetails.description} />
                    </div>

                    <h3 className={classes.headingTitle}>
                        <FormattedMessage
                            id={'productFullDetail.attributes'}
                            defaultMessage={'More Information'}
                        />
                    </h3>
                    <div className={classes.specifications}>
                        <ProductAttributes
                            attributes={productDetails.attributes}
                        />
                    </div>
                </div>
                <div className={classes.right} />
            </div>
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
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
    }),
    product: shape({
        __typename: string,
        id: number,
        stock_status: string,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                uid: string,
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string
    }).isRequired
};

ProductFullDetail.defaultProps = {
    showRelatedSideBar: true
};

export default ProductFullDetail;
