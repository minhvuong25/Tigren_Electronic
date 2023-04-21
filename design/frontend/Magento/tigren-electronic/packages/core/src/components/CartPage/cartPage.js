import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Check } from 'react-feather';
import { useCartPage } from '@tigrensolutions/core/src/talons/CartPage/useCartPage';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useToasts } from '@magento/peregrine';

import Icon from '@magento/venia-ui/lib/components/Icon';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';

const CouponCode = React.lazy(() =>
    import('@tigrensolutions/core/src/components/CartPage/PriceAdjustments/CouponCode')
);
import PriceSummary from '@tigrensolutions/core/src/components/CartPage/PriceSummary';
import ProductListing from '@tigrensolutions/core/src/components/CartPage/ProductListing';
import Breadcrumbs from '@tigrensolutions/core/src/components/Breadcrumbs';
import Button from '@magento/venia-ui/lib/components/Button';

import EmptyImage from '@tigrensolutions/core/src/static/images/empty-cart@2x.png';

import defaultClasses from './cartPage.module.css';
import RemoveCart from './ProductListing/RemoveCart';

const CheckIcon = <Icon size={20} src={Check} />;

/**
 * Structural page component for the shopping cart.
 * This is the main component used in the `/cart` route in Venia.
 * It uses child components to render the different pieces of the cart page.
 *
 * @see {@link https://venia.magento.com/cart}
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides for the component.
 * See [cartPage.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CartPage from "@magento/venia-ui/lib/components/CartPage";
 */
const CartPage = props => {
    const talonProps = useCartPage();
    const history = useHistory();

    const {
        cart,
        cartItems,
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        onAddToWishlistSuccess,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        wishlistSuccessProps,
        handleRemove,
        handleCancelRemove,
        handleClearAllCart,
        isShow,
        isCartClearing,
        isCartHasError
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    useEffect(() => {
        if (wishlistSuccessProps) {
            addToast({ ...wishlistSuccessProps, icon: CheckIcon });
        }
    }, [addToast, wishlistSuccessProps]);

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    if (!hasItems) {
        return (
            <div className={classes.emptyCart}>
                <img src={EmptyImage} alt="There are no items in your cart" />
                <h3>
                    <FormattedMessage
                        id={'cartPage.emptyCart'}
                        defaultMessage={'There are no items in your cart.'}
                    />
                </h3>
                <p>
                    <FormattedMessage
                        id={'cartPage.emptyCartDes'}
                        defaultMessage={
                            'Please click the button below to shop.'
                        }
                    />
                </p>
                <Button
                    priority="low"
                    negative={true}
                    onClick={() => history.push('/')}
                >
                    <FormattedMessage
                        id="global.backToHome"
                        defaultMessage="Back To HomePage"
                    />
                </Button>
            </div>
        );
    }

    const mayBeCartActions =
        !shouldShowLoadingIndicator && hasItems ? (
            <div className={classes.cartActions}>
                <Button priority="warning" onClick={() => history.push('/')}>
                    <FormattedMessage
                        id="global.continue"
                        defaultMessage="Continue Shopping"
                    />
                </Button>

                <Button
                    priority="warning"
                    disabled={isCartUpdating || isCartClearing}
                    onClick={handleRemove}
                >
                    <FormattedMessage
                        id="global.clear"
                        defaultMessage="Clear all"
                    />
                </Button>
            </div>
        ) : null;

    const productListing = hasItems ? (
        <ProductListing
            onAddToWishlistSuccess={onAddToWishlistSuccess}
            setIsCartUpdating={setIsCartUpdating}
            fetchCartDetails={fetchCartDetails}
        />
    ) : null;
    const summaryContainer = hasItems ? (
        <div className={classes.summary}>
            <div className={classes.summary_container}>
                <div className={classes.price_adjustments_container}>
                    <CouponCode setIsCartUpdating={setIsCartUpdating} />
                </div>
                <div className={classes.summary_contents}>
                    <PriceSummary
                        isUpdating={isCartUpdating}
                        isCartHasError={isCartHasError}
                    />
                </div>
            </div>
        </div>
    ) : null;

    const bodyClass = isCartClearing ? classes.bodyLoading : classes.body;

    return (
        <div className={classes.root}>
            <Breadcrumbs
                staticPart={formatMessage({
                    id: 'cartPage.heading',
                    defaultMessage: 'Shopping Cart'
                })}
            />
            <StoreTitle>
                {formatMessage({
                    id: 'cartPage.title',
                    defaultMessage: 'Cart'
                })}
            </StoreTitle>
            <div className={classes.heading_container}>
                <h1 className={classes.heading}>
                    <FormattedMessage
                        id={'cartPage.heading'}
                        defaultMessage={'Cart'}
                    />
                </h1>
                <div className={classes.stockStatusMessageContainer}>
                    <StockStatusMessage
                        cart={cart}
                        classes={{ message: classes.stockStatusMessage }}
                    />
                </div>
            </div>
            <div className={bodyClass}>
                <div className={classes.items_container}>
                    {productListing}
                    {mayBeCartActions}
                </div>
                {summaryContainer}
            </div>
            <RemoveCart
                onCancel={handleCancelRemove}
                onConfirm={handleClearAllCart}
                isOpen={isShow}
                title={formatMessage(
                    {
                        id: 'RemoveCart.titleAll',
                        defaultMessage:
                            'You want to delete all product.<span>Out of the basket?</span>'
                    },
                    { span: str => <span>{str}</span> }
                )}
            />
        </div>
    );
};
export default CartPage;
