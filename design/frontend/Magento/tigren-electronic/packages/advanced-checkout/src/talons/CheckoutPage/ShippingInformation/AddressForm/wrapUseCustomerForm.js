import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/addressBook.gql';
import { useCartContext } from '@magento/peregrine/lib/context/cart';

const wrapUseCustomerForm = original => props => {
    const defaultTalonsData = original(props);
    const { setCustomerAddressOnCartMutation } = DEFAULT_OPERATIONS;
    const { isSaving, handleSubmit } = defaultTalonsData;
    const { shippingData } = props;
    const [{ cartId }] = useCartContext();

    const [
        setCustomerAddressOnCart,
        { loading: isLoadingSetShippingAddressOnCart }
    ] = useMutation(setCustomerAddressOnCartMutation);

    const handleSubmitFormEdit = useCallback(
        async formValues => {
            try {
                await handleSubmit(formValues);
                const { id: addressId } = shippingData;
                await setCustomerAddressOnCart({
                    variables: {
                        cartId,
                        addressId
                    }
                });
            } catch {
                return;
            }
        },
        [handleSubmit, setCustomerAddressOnCart, shippingData]
    );

    return {
        ...defaultTalonsData,
        isSaving: isSaving || isLoadingSetShippingAddressOnCart,
        handleSubmit: handleSubmitFormEdit
    };
};

export default wrapUseCustomerForm;
