import React, { useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './shippingMethodButton.module.css';

import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

const ShippingMethodButton = props => {
    const {
        refForm,
        checkoutStep,
        isUpdating,
        setCheckoutStep,
        shippingMethodData
    } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const handleClick = useCallback(() => {
        if (shippingMethodData && shippingMethodData !== {}) {
            setCheckoutStep(CHECKOUT_STEP.PAYMENT);
            globalThis.scrollTo({
                left: 0,
                top: 100,
                behavior: 'smooth'
            });
        } else {
            refForm.current.handleSubmit();
        }
    }, [shippingMethodData, checkoutStep]);

    if (checkoutStep !== CHECKOUT_STEP.SHIPPING_METHOD) {
        return null;
    }

    return (
        <Button
            className={classes.shipping_method_button}
            onClick={() => handleClick()}
            priority="high"
            disabled={
                (!shippingMethodData || shippingMethodData === {}) && isUpdating
            }
        >
            <FormattedMessage
                id={'shippingMethod.continueToNextStep'}
                defaultMessage={'Continue to Payment Information'}
            />
        </Button>
    );
};

export default ShippingMethodButton;
