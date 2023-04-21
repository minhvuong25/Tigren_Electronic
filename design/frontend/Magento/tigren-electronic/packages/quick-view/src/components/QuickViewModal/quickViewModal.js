import React, { Fragment, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuickView } from '@tigrensolutions/quick-view/src/talons/QuickViewModal/useQuickView';

import { useStyle } from '@magento/venia-ui/lib/classify';
import FormError from '@magento/venia-ui/lib/components/FormError';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import { QuantityFields } from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';
import defaultClasses from './quickViewModal.module.css';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import ProductDetail from './productDetail';
import { useTgQuickViewContext } from '../../context';
import Carousel from '@tigrensolutions/gallery-zoom/src/components/ProductImageCarousel';
import Button from '@magento/venia-ui/lib/components/Button';
import { ProductOptionsShimmer } from '@magento/venia-ui/lib/components/ProductOptions';

const Options = React.lazy(() =>
    import('@magento/venia-ui/lib/components/ProductOptions')
);

const QuickViewModal = props => {
    const { showedSku, showQuickView } = useTgQuickViewContext();

    const talonProps = useQuickView({
        sku: showedSku,
        showQuickView
    });

    const {
        product,
        selectedVariant,
        productPrice,
        mediaGalleryEntries,
        errors,
        handleOptionSelection,
        productDetails,
        optionSelections,
        optionCodes,
        inStockVariants,
        handleSubmit,
        onChangeQuantity,
        isLoading,
        isDialogOpen,
        isOutOfStock,
        isDisabledAddToCart,
        handleClose
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    if (!isLoading && !product) {
        return null;
    }

    const dialogContent = product ? (
        <div className={classes.root}>
            <div className={classes.gallery}>
                <Carousel
                    images={mediaGalleryEntries}
                    additionalGalleryProps={{
                        thumbnailPosition: 'bottom',
                        showNav: true,
                        showBullets: false,
                        useBrowserFullscreen: false
                    }}
                    classes={{
                        root: classes.carousel_root,
                        thumbnailList: classes.carousel_thumbnailList
                    }}
                />
            </div>

            <div className={classes.details}>
                <FormError
                    classes={{
                        root: classes.errorContainer
                    }}
                    errors={Array.from(errors.values())}
                    scrollOnError={false}
                />
                <div className={classes.optionContainer}>
                    {isDialogOpen && (
                        <ProductDetail
                            product={product}
                            selectedVariant={selectedVariant}
                            mediaGalleryEntries={mediaGalleryEntries}
                            productPrice={productPrice}
                            productDetails={productDetails}
                        />
                    )}
                    <div className={classes.options}>
                        <Suspense fallback={<ProductOptionsShimmer />}>
                            <Options
                                onSelectionChange={handleOptionSelection}
                                options={product.configurable_options || []}
                                optionSelections={optionSelections}
                                optionCodes={optionCodes}
                                inStockVariants={inStockVariants}
                            />
                        </Suspense>
                    </div>
                </div>

                <h3 className={classes.quantityLabel}>
                    <FormattedMessage
                        id={'productForm.quantity'}
                        defaultMessage={'Quantity'}
                    />
                </h3>

                <QuantityFields
                    itemId={product.sku}
                    onChange={onChangeQuantity}
                    initialValue={1}
                />

                <div className={classes.actions}>
                    <Button
                        priority="high"
                        type="submit"
                        disabled={isDisabledAddToCart}
                    >
                        {isOutOfStock ? (
                            <FormattedMessage
                                id="productFullDetail.itemOutOfStock"
                                defaultMessage="Out of stock"
                            />
                        ) : (
                            <FormattedMessage
                                id="productFullDetail.addItemToCart"
                                defaultMessage="Add to cart"
                            />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <Fragment>
            <Dialog
                classes={{
                    contents: classes.contents,
                    dialog: classes.dialog,
                    body: classes.dialog_body,
                    header: classes.dialog_header,
                    form: classes.dialog_form
                }}
                confirmText={'Update'}
                confirmTranslationId={'productForm.submit'}
                isOpen={isDialogOpen}
                onCancel={handleClose}
                formProps={{
                    initialValues: {
                        quantity: 1
                    }
                }}
                onConfirm={handleSubmit}
                shouldUnmountOnHide={false}
                shouldShowButtons={false}
            >
                {isLoading ? (
                    <LoadingIndicator
                        classes={{
                            root: classes.loading
                        }}
                    />
                ) : (
                    dialogContent
                )}
            </Dialog>
        </Fragment>
    );
};

export default QuickViewModal;
