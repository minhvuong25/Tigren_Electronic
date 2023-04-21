import { useCallback, useEffect, useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import DEFAULT_OPERATIONS from './customerAddress.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

export const useBillingAddressBook = props => {
    const {
        customerAddresses,
        billingAddressData,
        shouldSubmit,
        onBillingAddressChangedSuccess,
        onBillingAddressChangedError,
        resetShouldSubmit
    } = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { setBillingAddressMutationCustomer } = operations;

    const [, { toggleDrawer }] = useAppContext();
    const [{ cartId }] = useCartContext();

    const addressCount = useRef();
    const [activeAddress, setActiveAddress] = useState();
    const [selectedAddress, setSelectedAddress] = useState();

    const [updateBillingAddress, { error, loading, called }] = useMutation(
        setBillingAddressMutationCustomer
    );

    useEffect(() => {
        if (customerAddresses.length !== addressCount.current) {
            // Auto-select newly added address when count changes
            if (addressCount.current) {
                const newestAddress =
                    customerAddresses[customerAddresses.length - 1];
                setSelectedAddress(newestAddress.id);
            }
            addressCount.current = customerAddresses.length;
        }
    }, [customerAddresses]);

    const handleEditBillingAddress = useCallback(
        address => {
            setActiveAddress(address);
            toggleDrawer('billingAddress.edit');
        },
        [toggleDrawer]
    );

    const handleAddBillingAddress = useCallback(() => {
        handleEditBillingAddress();
    }, [handleEditBillingAddress]);

    // GraphQL doesn't return which customer address is selected, so perform
    // a simple search to initialize this selected address value.
    if (customerAddresses.length && billingAddressData && !selectedAddress) {
        const billingAddress = billingAddressData?.cart?.billingAddress;
        if (billingAddress) {
            const foundSelectedAddress = customerAddresses.find(
                customerAddress =>
                    customerAddress.street[0] === billingAddress.street[0] &&
                    customerAddress.firstname === billingAddress.firstName &&
                    customerAddress.lastname === billingAddress.lastName
            );

            if (foundSelectedAddress) {
                setSelectedAddress(foundSelectedAddress.id);
            }
        }
    }

    useEffect(async () => {
        if (customerAddresses.length && !selectedAddress) {
            const foundSelectedAddress = customerAddresses[0];
            if (foundSelectedAddress) {
                setSelectedAddress(foundSelectedAddress.id);
            }
        }
    }, [customerAddresses, selectedAddress]);

    const handleApplyBillingAddress = useCallback(
        customerAddressID => {
            const addressID = customerAddressID
                ? customerAddressID
                : selectedAddress;
            setSelectedAddress(addressID);
        },
        [cartId, selectedAddress, updateBillingAddress]
    );

    const addBillingOnCart = useCallback(async () => {
        if (selectedAddress) {
            try {
                await updateBillingAddress({
                    variables: {
                        cartId,
                        customer_address_id: selectedAddress
                    }
                });
            } catch (err) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(err);
                }
            }
        } else {
            console.log('missing address id');
            resetShouldSubmit();
        }
    }, [updateBillingAddress, selectedAddress]);

    useEffect(async () => {
        if (shouldSubmit) {
            try {
                await addBillingOnCart();
            } catch (e) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(e);
                }
                onBillingAddressChangedError();
            }
        }
    }, [shouldSubmit, addBillingOnCart]);

    useEffect(() => {
        try {
            const setBillingCompleted = called && !loading;
            if (setBillingCompleted && !error) {
                onBillingAddressChangedSuccess();
            }

            if (setBillingCompleted && error) {
                /**
                 * Billing address save mutation is not successful.
                 * Reset update button clicked flag.
                 */
                throw new Error('Billing address mutation failed');
            }
        } catch (e) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(e);
            }
            resetShouldSubmit();
            onBillingAddressChangedError();
        }
    }, [called, loading, error]);

    return {
        isLoading: loading,
        activeAddress,
        selectedAddress,
        handleApplyBillingAddress,
        handleAddBillingAddress,
        handleEditBillingAddress
    };
};
