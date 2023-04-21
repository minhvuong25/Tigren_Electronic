import React, { useCallback } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './stepBar.module.css';
import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import { FormattedMessage } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button/button.js';

const StepBar = props => {
    const { checkoutStep, setCheckoutStep, setPrevious } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const activeShippingInformation =
        checkoutStep >= CHECKOUT_STEP.SHIPPING_ADDRESS ? classes.active : '';
    const activeShippingMethod =
        checkoutStep >= CHECKOUT_STEP.SHIPPING_METHOD ? classes.active : '';
    const activePayment =
        checkoutStep >= CHECKOUT_STEP.PAYMENT ? classes.active : '';
    const changeStep = useCallback(
        value => {
            setPrevious(true);
            setCheckoutStep(value);
        },
        [checkoutStep]
    );

    return (
        <div className={classes.root}>
            <Button
                className={`${classes.button} ${
                    classes.shippingAddress
                } ${activeShippingInformation}`}
                onClick={() => {
                    changeStep(CHECKOUT_STEP.SHIPPING_ADDRESS);
                }}
                disabled={activeShippingInformation === ''}
                priority="high"
            >
                <span className={classes.content}>
                    <FormattedMessage
                        id={'shippingInformation.editTitle'}
                        defaultMessage={'1. Shipping Information'}
                    />
                </span>
            </Button>
            <Button
                className={`${classes.button} ${
                    classes.shippingMethod
                } ${activeShippingMethod}`}
                onClick={() => {
                    changeStep(CHECKOUT_STEP.SHIPPING_METHOD);
                }}
                disabled={activeShippingMethod === ''}
                priority="high"
            >
                <span className={classes.content}>
                    <FormattedMessage
                        id={'checkoutPage.shippingMethodStep'}
                        defaultMessage={'2. Shipping Method'}
                    />
                </span>
            </Button>
            <Button
                className={`${classes.button} ${
                    classes.payment
                } ${activePayment}`}
                onClick={() => {
                    changeStep(CHECKOUT_STEP.PAYMENT);
                }}
                disabled={activePayment === ''}
                priority="high"
            >
                <span className={classes.content}>
                    <FormattedMessage
                        id={'checkoutPage.paymentInformationStep'}
                        defaultMessage={'3. Payment Information'}
                    />
                </span>
            </Button>
        </div>
    );
};

StepBar.propTypes = {
    active: bool,
    classes: shape({
        content: string,
        root: string
    }),
    onClick: func
};

export default StepBar;
