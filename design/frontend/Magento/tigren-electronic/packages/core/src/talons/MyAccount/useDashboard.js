import { useQuery } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from './dashboard.gql';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export const useDashboard = (props = {}) => {
    const operations = mergeOperations(defaultOperations, props.operations);

    const history = useHistory();
    const { data, error, loading: isLoading } = useQuery(
        operations.getCustomerQuery,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    const customer = data && data.customer;

    const defaultBillingAddress = ((customer && customer.addresses) || []).find(
        address => address.default_billing
    );

    const defaultShippingAddress = (
        (customer && customer.addresses) ||
        []
    ).find(address => address.default_shipping);

    const handleChangePassword = useCallback(() => {
        history.push({
            pathname: '/customer/account/edit',
            state: { action: 'changPassword' }
        });
    }, [history]);

    return {
        error,
        isLoading,
        customer,
        handleChangePassword,
        defaultShippingAddress,
        defaultBillingAddress
    };
};
