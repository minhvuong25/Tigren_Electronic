import { useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import DEFAULT_OPERATIONS from '@tigrensolutions/advanced-checkout/src/talons/CheckoutPage/advancedCheckoutPage.gql.js';
import payments from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethodCollection.js';
import { useToasts } from '@magento/peregrine';

const wrapUsePaymentMethods = original => props => {
    const { setPageIsUpdating } = props;
    const defaultTalonsData = original(props);
    const {
        availablePaymentMethods,
        currentSelectedPaymentMethod
    } = defaultTalonsData;
    const [, { addToast }] = useToasts();
    const { setPaymentMethodOnCartMutation } = DEFAULT_OPERATIONS;

    const [{ cartId }] = useCartContext();
    const [updatePaymentMethod] = useMutation(setPaymentMethodOnCartMutation);

    const initialSelectedMethodNew = useMemo(() => {
        if (!availablePaymentMethods.length) {
            return null;
        }
        const initValue = availablePaymentMethods.find(({ code }) =>
            Object.keys(payments).includes(code)
        );
        return initValue ? initValue.code : null;
    }, [availablePaymentMethods, payments]);

    useEffect(async () => {
        if (currentSelectedPaymentMethod) {
            try {
                typeof setPageIsUpdating === 'function' &&
                    setPageIsUpdating(true);
                await updatePaymentMethod({
                    variables: {
                        cartId,
                        paymentMethodValue: currentSelectedPaymentMethod
                    }
                });
                typeof setPageIsUpdating === 'function' &&
                    setPageIsUpdating(false);
            } catch (e) {
                addToast({
                    type: 'error',
                    message: e && e.message,
                    timeout: 4000
                });
                typeof setPageIsUpdating === 'function' &&
                    setPageIsUpdating(false);
            }
        }
    }, [currentSelectedPaymentMethod]);

    return {
        ...defaultTalonsData,
        initialSelectedMethod: initialSelectedMethodNew
    };
};

export default wrapUsePaymentMethods;
