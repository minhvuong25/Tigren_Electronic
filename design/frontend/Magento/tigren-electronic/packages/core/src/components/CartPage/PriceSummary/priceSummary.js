import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import { usePriceSummary } from '@tigrensolutions/core/src/talons/CartPage/PriceSummary/usePriceSummary';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './priceSummary.module.css';
import DiscountSummary from '@tigrensolutions/core/src/components/CartPage/PriceSummary/discountSummary';
import GiftCardSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/giftCardSummary';
import ShippingSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/shippingSummary';
import TaxSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/taxSummary';

/**
 * A child component of the CartPage component.
 * This component fetches and renders cart data, such as subtotal, discounts applied,
 * gift cards applied, tax, shipping, and cart total.
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides.
 * See [priceSummary.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import PriceSummary from "@magento/venia-ui/lib/components/CartPage/PriceSummary";
 */
const PriceSummary = props => {
    const { isUpdating, isCartHasError } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const talonProps = usePriceSummary();

    const {
        handleProceedToCheckout,
        hasError,
        hasItems,
        isCheckout,
        isLoading,
        flatData
    } = talonProps;
    const { formatMessage } = useIntl();

    if (hasError) {
        return (
            <div className={classes.root}>
                <span className={classes.errorText}>
                    <FormattedMessage
                        id={'priceSummary.errorText'}
                        defaultMessage={
                            'Something went wrong. Please refresh and try again.'
                        }
                    />
                </span>
            </div>
        );
    } else if (!hasItems) {
        return null;
    }

    const {
        subtotal,
        total,
        discounts,
        giftCards,
        taxes,
        shipping,
        total_incl
    } = flatData;

    const isPriceUpdating = isUpdating || isLoading;
    const priceClass = isPriceUpdating ? classes.priceUpdating : classes.price;
    const priceClassDiscount = isPriceUpdating
        ? classes.priceUpdating
        : classes.priceDiscount;
    const totalPriceClass = isPriceUpdating
        ? classes.priceUpdating
        : classes.totalPrice;

    const totalPriceLabel = isCheckout
        ? formatMessage({
              id: 'priceSummary.total',
              defaultMessage: 'Total'
          })
        : formatMessage({
              id: 'priceSummary.total',
              defaultMessage: 'Total'
          });

    const proceedToCheckoutButton = !isCheckout ? (
        <div className={classes.checkoutButton_container}>
            <Button
                disabled={isPriceUpdating || isCartHasError}
                priority={'high'}
                onClick={handleProceedToCheckout}
                classes={{
                    root_highPriority: classes.root_highPriorityCart
                }}
            >
                <FormattedMessage
                    id={'priceSummary.checkoutButton'}
                    defaultMessage={'Proceed to Checkout'}
                />
            </Button>
        </div>
    ) : null;

    return (
        <div className={classes.root}>
            {!isCheckout && (
                <div className={classes.title}>
                    <span>
                        <FormattedMessage
                            id={'priceSummary.title'}
                            defaultMessage={'Summary'}
                        />
                    </span>
                </div>
            )}
            <div className={classes.lineItems}>
                {total_incl && (
                    <>
                        <span className={classes.lineItemLabel}>
                            {formatMessage({
                                id: 'productListing.productPrice',
                                defaultMessage: 'Product Price'
                            })}
                        </span>
                        <span className={priceClass}>
                            <Price
                                value={total_incl.value}
                                currencyCode={total_incl.currency}
                            />
                        </span>
                    </>
                )}
                <span className={classes.lineItemLabel}>
                    <FormattedMessage
                        id={'priceSummary.amountBeforeTax'}
                        defaultMessage={'Amount before tax'}
                    />
                </span>
                <span className={priceClass}>
                    <Price
                        value={subtotal.value}
                        currencyCode={subtotal.currency}
                    />
                </span>
                <GiftCardSummary
                    classes={{
                        lineItemLabel: classes.lineItemLabel,
                        price: priceClass
                    }}
                    data={giftCards}
                />
                <TaxSummary
                    classes={{
                        lineItemLabel: classes.lineItemLabel,
                        price: priceClass
                    }}
                    data={taxes}
                    isCheckout={isCheckout}
                />
            </div>
            <DiscountSummary
                classes={{
                    lineItemLabel: classes.lineItemLabel,
                    price: priceClassDiscount
                }}
                data={discounts}
            />
            <div className={classes.lineItems}>
                <ShippingSummary
                    classes={{
                        lineItemLabel: classes.lineItemLabel,
                        price: priceClass
                    }}
                    data={shipping}
                    isCheckout={isCheckout}
                />
            </div>
            <div className={classes.lineItemsTotal}>
                <span className={classes.totalLabel}>{totalPriceLabel}</span>
                <span className={totalPriceClass}>
                    <Price value={total.value} currencyCode={total.currency} />
                </span>
            </div>
            {proceedToCheckoutButton}
        </div>
    );
};

export default PriceSummary;
