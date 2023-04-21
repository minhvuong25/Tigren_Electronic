import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, Redirect } from 'react-router-dom';
import { useCheckoutSuccess } from '@tigrensolutions/thank-you-page/src/talons/CheckoutSuccess/useCheckoutSuccess.js';
import CheckoutSuccessShimmer from './checkoutSuccess.shimmer';
import OrderHistoryContextProvider from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';
import OrderDetails from '@tigrensolutions/thank-you-page/src/components/CheckoutSuccess/OrderDetails';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './checkoutSuccess.module.css';

const CheckoutSuccess = props => {
    const talonProps = useCheckoutSuccess();
    const classes = useStyle(defaultClasses, props.classes);
    const {
        error,
        loading,
        orderData,
        orderNumber,
        isCreateAccountAfterCheckout
    } = talonProps;

    const history = useHistory();

    const handleGoHome = useCallback(() => {
        history.push('/');
    }, [history]);

    if (loading) {
        return <CheckoutSuccessShimmer />;
    }

    if (isCreateAccountAfterCheckout) {
        return <Redirect to="/account-information" />;
    }

    if (!orderNumber) {
        return <Redirect to="/cart" />;
    }

    if (!orderData) {
        return null;
    }

    return (
        <OrderHistoryContextProvider>
            <div className={classes.root}>
                <OrderDetails
                    orderData={orderData}
                    loading={loading}
                    error={error}
                />
                <div className={classes.button}>
                    <Button
                        priority="danger"
                        type="button"
                        onClick={handleGoHome}
                    >
                        <FormattedMessage
                            id={'errorView.goHome'}
                            defaultMessage={'Back to Homepage'}
                        />
                    </Button>
                </div>
            </div>
        </OrderHistoryContextProvider>
    );
};

export default CheckoutSuccess;
