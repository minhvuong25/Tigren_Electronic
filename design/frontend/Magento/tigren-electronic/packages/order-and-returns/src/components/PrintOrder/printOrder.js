import React from 'react';
import { shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';

import { Link } from 'react-router-dom';

import {
    Tab as TabHeader,
    TabList,
    TabPanel,
    Tabs as TabWrapper
} from 'react-tabs';
import { FormattedMessage } from 'react-intl';
import Items from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/items';
import OrderTotal from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/orderTotal';
import OrderShipment from '@tigrensolutions/order-and-returns/src/components/OrderDetails/orderShipment';
import ShippingInformation from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingInformation';
import ShippingMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingMethod';
import BillingInformation from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/billingInformation';
import PaymentMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/paymentMethod';

import Logo from '@tigrensolutions/base/src/components/Logo';

import defaultClasses from '@tigrensolutions/order-and-returns/src/components/PrintOrder/printOrder.module.css';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

const PrintOrder = props => {
    const { classes: propClasses, order, printRef, imagesData } = props;
    const classes = useStyle(defaultClasses, propClasses);

    if (!order) {
        return null;
    }

    const {
        number,
        order_date,
        status,
        shipments,
        billing_address,
        items,
        payment_methods,
        shipping_address,
        shipping_method,
        total
    } = order || {};

    const hasShipment = !!shipments && shipments.length;
    const shippingMethodData = {
        shippingMethod: shipping_method,
        shipments
    };

    const isoFormattedDate = order_date.replace(' ', 'T');
    const formattedDate = new Date(isoFormattedDate).toLocaleDateString(
        undefined,
        {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }
    );
    const noShipment = !hasShipment ? classes.noShipment : classes.hasShipment;

    return (
        <div className={classes.printOrderPage} ref={printRef}>
            <div className={classes.orderShowPrint}>
                <Link to={resourceUrl('/')} className={classes.logoLink}>
                    <Logo height={26} width={118} isNormalImg={true} />
                </Link>
                <div className={classes.numberOrder}>
                    <h2>
                        <FormattedMessage
                            id="OrdersAndReturns.number"
                            defaultMessage="Order Number"
                        />
                        #{!!number && number}
                    </h2>
                    <h3>{status}</h3>
                </div>
                <p className={classes.orderDatePrint}>{formattedDate}</p>
            </div>
            <div className={classes.orderDetailBox}>
                <TabWrapper className={classes.headerTab}>
                    <TabList>
                        <TabHeader className={noShipment} />
                        {!!hasShipment && <TabHeader />}
                    </TabList>
                    <TabPanel>
                        <div className={classes.orderDetailContent}>
                            <div className={classes.itemsContainer}>
                                <Items data={{ imagesData, items }} />
                            </div>
                            <div className={classes.orderTotalContainer}>
                                <OrderTotal data={total} />
                            </div>
                        </div>
                    </TabPanel>
                    {!!hasShipment && (
                        <TabPanel>
                            <div className={classes.orderDetailContent}>
                                <OrderShipment shipments={shipments} />
                            </div>
                        </TabPanel>
                    )}
                </TabWrapper>
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
                        <ShippingInformation data={shipping_address} />
                    </div>
                    <div className={classes.shippingMethodContainer}>
                        <ShippingMethod data={shippingMethodData} />
                    </div>
                    <div className={classes.billingInformationContainer}>
                        <BillingInformation data={billing_address} />
                    </div>
                    <div className={classes.paymentMethodContainer}>
                        <PaymentMethod data={payment_methods} />
                    </div>
                </div>
            </div>
            <div>
                <div className={classes.copyright}>
                    <FormattedMessage
                        id="footer.copyright"
                        defaultMessage="Tigren Solutions © 2012-2022. All rights reserved."
                    />
                </div>
            </div>
        </div>
    );
};

export default PrintOrder;

PrintOrder.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        submitIcon: string,
        loadMoreButton: string
    })
};
