import React, { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import {
    Tabs as TabWrapper,
    TabList,
    Tab as TabHeader,
    TabPanel
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Printer } from 'react-feather';

import { useOrderAndReturnsDetail } from '@tigrensolutions/order-and-returns/src/talons/OrdersAndReturns/useOrderAndReturnDetail.js';
import Items from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/items';
import PaymentMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/paymentMethod';
import ShippingMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingMethod';
import ShippingInformation from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingInformation';
import BillingInformation from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/billingInformation';
import OrderTotal from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/orderTotal';
import OrderShipment from '@tigrensolutions/order-and-returns/src/components/OrderDetails/orderShipment';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Button from '@magento/venia-ui/lib/components/Button';
import PrintOrder from '../PrintOrder';
import OrderDetailsShimmer from './orderDetails.shimmer';

import ReactToPrint from 'react-to-print';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@tigrensolutions/order-and-returns/src/components/OrderDetails/orderDetails.module.css';

const defaultOrderData = {
    billing_address: {},
    items: [],
    payment_methods: [],
    shipments: [],
    shipping_address: {},
    shipping_method: {}
};

const OrderDetails = (props = {}) => {
    const printRef = useRef();
    const { currentOrder, closePopupOrderDetail } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const orderData = Object.assign(defaultOrderData, currentOrder);
    const items = orderData?.items;
    const talonProps = useOrderAndReturnsDetail({ items });

    const { imagesData, loading } = talonProps;

    const shippingMethodData = {
        shippingMethod: orderData?.shipping_method,
        shipments: orderData?.shipments
    };

    const hasShipment = orderData?.shipments.length > 0;
    const noShipmentClass = hasShipment
        ? classes.noShipment
        : classes.hasShipment;

    if (loading) {
        return <OrderDetailsShimmer />;
    }

    return (
        <div className={classes.root}>
            <div className={classes.orderTitle}>
                <div className={classes.orderNumber}>
                    <h3>
                        <FormattedMessage
                            id="OrdersAndReturns.number"
                            defaultMessage="Order Number"
                        />
                        #{orderData?.number}
                    </h3>
                </div>
                <div className={classes.btnPrint}>
                    <ReactToPrint
                        trigger={() => (
                            <Button priority={'normal'}>
                                <Icon src={Printer} />
                                <span className={classes.printLabel}>
                                    <FormattedMessage
                                        id="orderDetails.printLabel"
                                        defaultMessage="Print Order"
                                    />
                                </span>
                            </Button>
                        )}
                        content={() => printRef.current}
                    />
                    <PrintOrder
                        order={orderData}
                        printRef={printRef}
                        imagesData={imagesData}
                    />
                </div>
            </div>
            <div className={classes.infoOrder}>
                <div className={classes.heading}>
                    <FormattedMessage
                        id="orderDetails.orderInformation"
                        defaultMessage="Order Information"
                    />
                </div>
                <div className={classes.orderInformation}>
                    <div className={classes.shippingInformationContainer}>
                        <ShippingInformation
                            data={orderData.shipping_address}
                        />
                    </div>
                    <div className={classes.billingInformationContainer}>
                        <BillingInformation data={orderData.billing_address} />
                    </div>
                    <div className={classes.shippingMethodContainer}>
                        <ShippingMethod data={shippingMethodData} />
                    </div>
                    <div className={classes.paymentMethodContainer}>
                        <PaymentMethod data={orderData.payment_methods} />
                    </div>
                </div>
            </div>
            <div className={classes.orderDetailBox}>
                <TabWrapper className={classes.headerTab}>
                    <TabList>
                        <TabHeader className={noShipmentClass}>
                            <h3 className={classes.heading}>
                                <FormattedMessage
                                    id="orderItems.itemsHeading"
                                    defaultMessage="Items Ordered"
                                />
                            </h3>
                        </TabHeader>
                        {hasShipment && (
                            <TabHeader>
                                <h3 className={classes.heading}>
                                    <FormattedMessage
                                        id="orderItems.shipHeading"
                                        defaultMessage="Order Shipments"
                                    />
                                </h3>
                            </TabHeader>
                        )}
                    </TabList>
                    <TabPanel>
                        <div className={classes.orderDetailContent}>
                            <div className={classes.itemsContainer}>
                                <Items
                                    data={{
                                        imagesData,
                                        items: orderData.items
                                    }}
                                />
                            </div>
                            <div className={classes.orderTotalContainer}>
                                <OrderTotal data={orderData.total} />
                            </div>
                        </div>
                    </TabPanel>
                    {hasShipment && (
                        <TabPanel>
                            <div className={classes.orderDetailContent}>
                                <OrderShipment
                                    shipments={orderData.shipments}
                                />
                            </div>
                        </TabPanel>
                    )}
                </TabWrapper>
            </div>
            <div className={classes.backButton}>
                <Button
                    type="button"
                    priority="high"
                    onClick={closePopupOrderDetail}
                >
                    <FormattedMessage
                        id="ordersAndReturns.backToTracking"
                        defaultMessage="Check another order"
                    />
                </Button>
            </div>
        </div>
    );
};

export default OrderDetails;
