import React from 'react';
import { useAddressForm } from '@tigrensolutions/advanced-checkout/src/talons/CheckoutPage/ShippingInformation/AddressForm/useAddressForm.js';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';

const WrapAddressForm = Component => props => {
    const { shippingData } = props;
    const { generalCountryDefault, loadingStoreConfig } = useAddressForm({});
    const shippingDataNew = {
        country: {
            code: generalCountryDefault || DEFAULT_COUNTRY_CODE
        },
        region: {
            id: null
        }
    };

    if (loadingStoreConfig) {
        return <LoadingIndicator />;
    }

    return (
        <Component
            {...props}
            shippingData={shippingData ? shippingData : shippingDataNew}
        />
    );
};

export default WrapAddressForm;
