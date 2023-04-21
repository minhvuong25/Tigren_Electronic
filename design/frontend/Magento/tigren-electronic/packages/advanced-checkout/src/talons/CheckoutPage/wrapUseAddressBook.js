import { useCallback, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/addressBook.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

const wrapUseAddressBook = original => props => {
    const defaultTalonsData = original(props);
    const { onSuccess } = props;
    const {
        selectedAddress,
        handleSelectAddress,
        isLoading,
        customerAddresses
    } = defaultTalonsData;
    const [{ cartId }] = useCartContext();
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { setCustomerAddressOnCartMutation } = operations;

    const [
        setCustomerAddressOnCart,
        {
            error: setCustomerAddressOnCartError,
            loading: setCustomerAddressOnCartLoading
        }
    ] = useMutation(setCustomerAddressOnCartMutation, {
        onCompleted: () => {
            onSuccess();
        }
    });

    const handleSelectAddressNew = useCallback(
        async customAddressId => {
            const addressId = customAddressId
                ? customAddressId
                : selectedAddress;
            try {
                await setCustomerAddressOnCart({
                    variables: {
                        cartId,
                        addressId
                    }
                });
            } catch {
                return;
            }
            handleSelectAddress(addressId);
        },
        [cartId, selectedAddress, setCustomerAddressOnCart, handleSelectAddress]
    );

    const customerAddressCount = useRef();
    useEffect(() => {
        if (customerAddresses.length !== customerAddressCount.current) {
            // Auto-select newly added address when count changes
            if (customerAddressCount.current) {
                const newestAddress =
                    customerAddresses[customerAddresses.length - 1];
                handleSelectAddressNew(newestAddress.id);
            }

            customerAddressCount.current = customerAddresses.length;
        }
    }, [customerAddresses]);

    return {
        ...defaultTalonsData,
        handleSelectAddress: handleSelectAddressNew,
        isLoading: setCustomerAddressOnCartLoading || isLoading
    };
};

export default wrapUseAddressBook;
