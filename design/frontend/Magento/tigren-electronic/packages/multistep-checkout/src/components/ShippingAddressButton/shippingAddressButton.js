import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './shippingAddressButton.module.css';

import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

const ShippingAddressButton = props => {
    const {
        refForm,
        checkoutStep,
        shippingInformationData,
        setCheckoutStep
    } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const handleClick = useCallback(() => {
        if (shippingInformationData && shippingInformationData !== {}) {
            setCheckoutStep(CHECKOUT_STEP.SHIPPING_METHOD);
            globalThis.scrollTo({
                left: 0,
                top: 100,
                behavior: 'smooth'
            });
        } else {
            refForm.current.handleSubmit();
        }
    }, [shippingInformationData, checkoutStep]);

    if (checkoutStep !== CHECKOUT_STEP.SHIPPING_ADDRESS) {
        return null;
    }

    return (
        <Button
            className={classes.shipping_address_button}
            onClick={() => handleClick()}
            priority="high"
            disabled={
                (!shippingInformationData || shippingInformationData === {}) &&
                (!refForm.current || refForm.current.isLoading)
            }
        >
            <FormattedMessage
                id={'guestForm.continueToNextStep'}
                defaultMessage={'Continue to Shipping Method'}
            />
        </Button>
    );
};

export default ShippingAddressButton;
