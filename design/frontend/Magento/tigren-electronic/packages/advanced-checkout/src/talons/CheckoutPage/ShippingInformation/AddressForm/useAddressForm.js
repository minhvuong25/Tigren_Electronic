import DEFAULT_OPERATIONS from '@tigrensolutions/advanced-checkout/src/talons/CheckoutPage/advancedCheckoutPage.gql.js';

import { useQuery } from '@apollo/client';

export const useAddressForm = props => {
    const { getCountryDefault } = DEFAULT_OPERATIONS;
    const { data: storeConfigData, loading: loadingStoreConfig } = useQuery(
        getCountryDefault,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const generalCountryDefault =
        storeConfigData?.storeConfig?.general_country_default;

    return {
        generalCountryDefault,
        loadingStoreConfig
    };
};
