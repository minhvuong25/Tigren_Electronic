import { useCallback, useEffect, useState } from 'react';
import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';

const wrapUseCheckoutPage = original => props => {
    const defaultTalonsData = original(props);

    const { checkoutStep, setCheckoutStep } = defaultTalonsData;
    const [previous, setPrevious] = useState(false);
    const [shippingInformationData, setShippingInformationData] = useState(
        null
    );
    const [shippingMethodData, setShippingMethodData] = useState(null);
    const handlePreviousStep = useCallback(() => {
        setPrevious(true);
        if (checkoutStep === CHECKOUT_STEP.REVIEW) {
            setCheckoutStep(CHECKOUT_STEP.PAYMENT);
        } else if (checkoutStep === CHECKOUT_STEP.PAYMENT) {
            setCheckoutStep(CHECKOUT_STEP.SHIPPING_METHOD);
        } else if (checkoutStep === CHECKOUT_STEP.SHIPPING_METHOD) {
            setCheckoutStep(CHECKOUT_STEP.SHIPPING_ADDRESS);
        }
        globalThis.scrollTo({
            left: 0,
            top: 100,
            behavior: 'smooth'
        });
    }, [checkoutStep]);

    const setShippingInformationDone = useCallback(() => {
        if (checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS && !previous) {
            setCheckoutStep(CHECKOUT_STEP.SHIPPING_METHOD);
        }
    }, [checkoutStep]);

    const setShippingMethodDone = useCallback(() => {
        if (checkoutStep === CHECKOUT_STEP.SHIPPING_METHOD && !previous) {
            setCheckoutStep(CHECKOUT_STEP.PAYMENT);
        }
    }, [checkoutStep]);

    return {
        ...defaultTalonsData,
        handlePreviousStep,
        setPrevious,
        setShippingInformationDone,
        setShippingMethodDone,
        checkoutStep,
        setCheckoutStep,
        shippingInformationData,
        setShippingInformationData,
        shippingMethodData,
        setShippingMethodData
    };
};

export default wrapUseCheckoutPage;
