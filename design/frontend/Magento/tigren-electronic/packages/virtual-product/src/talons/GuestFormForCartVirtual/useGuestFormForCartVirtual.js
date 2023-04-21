import { useCallback, useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from '@magento/peregrine/lib/talons/CheckoutPage/ShippingInformation/AddressForm/guestForm.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';

import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { SET_GUEST_EMAIL_ON_CART } from '../setGuestEmailOnCart.gql';
import { CHECKOUT_STEP } from '@magento/peregrine/lib/talons/CheckoutPage/useCheckoutPage';
import { useToasts } from '@magento/peregrine';

export const useGuestFormForCartVirtual = props => {
    const {
        setGuestSignInUsername,
        toggleSignInContent,
        onSave,
        formApiRef
    } = props;
    const [showSignInToast, setShowSignInToast] = useState(false);
    const [, { addToast }] = useToasts();
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { getEmailAvailableQuery } = operations;

    const [setGuestEmailOnCart] = useMutation(SET_GUEST_EMAIL_ON_CART);
    const [{ cartId }] = useCartContext();

    const [runQuery, { data }] = useLazyQuery(getEmailAvailableQuery, {
        fetchPolicy: 'cache-and-network'
    });

    // Simple heuristic to indicate form was submitted prior to this render

    const handleSubmit = useCallback(
        async formValues => {
            try {
                await setGuestEmailOnCart({
                    variables: {
                        cartId,
                        email: formValues.email
                    }
                });
                onSave(CHECKOUT_STEP.PAYMENT);
            } catch (err) {
                addToast({
                    type: 'error',
                    message: err.message,
                    timeout: 7000
                });
            }
        },
        [cartId]
    );

    const handleBlurForm = useCallback(
        value => {
            formApiRef.current.submitForm();
        },
        [formApiRef]
    );

    const handleValidateEmail = useCallback(
        email => {
            setShowSignInToast(false);
            if (email && email.includes('@')) {
                runQuery({ variables: { email } });
            }
        },
        [runQuery]
    );

    const handleToastAction = useCallback(
        (removeToast, email) => {
            setGuestSignInUsername(email);
            toggleSignInContent();
            removeToast();
        },
        [setGuestSignInUsername, toggleSignInContent]
    );

    useEffect(() => {
        if (
            data &&
            data.isEmailAvailable &&
            data.isEmailAvailable.is_email_available
        ) {
            setShowSignInToast(!data.isEmailAvailable.is_email_available);
        }
    }, [data]);

    return {
        handleSubmit,
        handleBlurForm,
        handleValidateEmail,
        handleToastAction,
        showSignInToast
    };
};
