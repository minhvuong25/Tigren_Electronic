import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderDetailsPage } from '@tigrensolutions/core/src/talons/OrderHistoryPage/useOrderDetail';
import { FormattedMessage } from 'react-intl';
import defaultClasses from './orderDetailsPage.module.css';
import OrderHistoryContextProvider from '@magento/peregrine/lib/talons/OrderHistoryPage/orderHistoryContext';
import { useStyle } from '@magento/venia-ui/lib/classify';
import OrderDetails from '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/orderDetails.js';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import OrderDetailsPageShimmer from './orderDetailsPage.shimmer';

const OrderDetailsPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const params = useParams();
    const talonProps = useOrderDetailsPage({
        params: params.id
    });

    const {
        isBackgroundLoading,
        isLoadingWithoutData,
        orderLoading,
        orders,
        handleReorder,
        handlePrintCompare,
        isLoading
    } = talonProps;

    const orderRows = useMemo(() => {
        if (orderLoading) {
            return <OrderDetailsPageShimmer />;
        }
        if (!orders) {
            return null;
        }
        return (
            orders &&
            orders.map(order => {
                return (
                    <OrderDetails
                        orderData={order}
                        handleReorder={handleReorder}
                        handlePrintCompare={handlePrintCompare}
                        isBusy={isLoading}
                    />
                );
            })
        );
    }, [orders, orderLoading]);

    const pageContents = useMemo(() => {
        if (isLoadingWithoutData) {
            return <OrderDetailsPageShimmer />;
        } else if (!isBackgroundLoading && !orders.length) {
            return (
                <h3 className={classes.emptyHistoryMessage}>
                    <FormattedMessage
                        id={'orderHistoryPage.emptyDataMessage'}
                        defaultMessage={"You don't have any orders yet."}
                    />
                </h3>
            );
        } else if (orders.length) {
            return <div className={classes.orderInfoWrapper}>{orderRows}</div>;
        } else {
            return (
                <h3 className={classes.emptyHistoryMessage}>
                    <FormattedMessage
                        id={'orderHistoryPage.emptyDataMessage'}
                        defaultMessage={"You don't have any orders yet."}
                    />
                </h3>
            );
        }
    }, [
        classes.emptyHistoryMessage,
        classes.orderHistoryTable,
        isBackgroundLoading,
        isLoadingWithoutData,
        orderRows,
        orders.length
    ]);

    return (
        <OrderHistoryContextProvider>
            <div>{pageContents}</div>
        </OrderHistoryContextProvider>
    );
};

export default OrderDetailsPage;
