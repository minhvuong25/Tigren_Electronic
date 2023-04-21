import { useCallback, useEffect } from 'react';
import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import DEFAULT_OPERATIONS from '@tigrensolutions/advanced-checkout/src/talons/CheckoutPage/advancedCheckoutPage.gql.js';

import { useQuery } from '@apollo/client';

const wrapUseCheckoutPage = original => props => {
    const defaultTalonsData = original(props);
    const { getStoreConfigQuery } = DEFAULT_OPERATIONS;

    const {
        checkoutStep,
        handlePlaceOrder,
        handleReviewOrder
    } = defaultTalonsData;

    const { data: storeConfigData, loading: loadingStoreConfig } = useQuery(
        getStoreConfigQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const allowGuestCheckout =
        storeConfigData?.storeConfig?.allow_guest_checkout;
    const generalCountryDefault =
        storeConfigData?.storeConfig?.general_country_default;

    const handlePlaceOrderWrap = useCallback(() => {
        handleReviewOrder();
    }, [handleReviewOrder]);

    useEffect(() => {
        if (checkoutStep === CHECKOUT_STEP.REVIEW) {
            handlePlaceOrder();
        }
    }, [checkoutStep]);

    return {
        ...defaultTalonsData,
        handlePlaceOrder: handlePlaceOrderWrap,
        allowGuestCheckout,
        generalCountryDefault,
        loadingStoreConfig
    };
};

export default wrapUseCheckoutPage;
