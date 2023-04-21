import React from 'react';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Logo from '@tigrensolutions/base/src/components/Logo';
import defaultClasses from './printOrder.module.css';
import Items from './items';
import { useOrderRow } from '@tigrensolutions/core/src/talons/OrderHistoryPage/useOrderRow';
import ShippingInformation from '../shippingInformation';
import ShippingMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingMethod';
import BillingInformation from '../billingInformation';
import PaymentMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/paymentMethod';
import OrderTotal from '../orderTotal';

const ConditionalWrapper = props => (props.condition ? props.children : null);

const PrintOrder = props => {
    const { classes: propsClasses, orderData, printRef } = props;
    const classes = useStyle(defaultClasses, propsClasses);

    if (!orderData) {
        return null;
    }

    const {
        items,
        total,
        shipments,
        payment_methods,
        shipping_address,
        shipping_method,
        billing_address
    } = orderData;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const talonProps = useOrderRow({ items });
    const { imagesData } = talonProps;
    const hasTotals = total.grand_total && total.grand_total.currency;
    const shippingMethodData = {
        shippingMethod: shipping_method,
        shipments
    };

    return (
        <div className={classes.root} ref={printRef}>
            <div className={classes.header}>
                <Logo
                    isNormalImg
                    height={26}
                    width={118}
                    classes={{ logo: classes.logo }}
                />
            </div>
            <div className={classes.content}>
                <ConditionalWrapper condition={items && items.length}>
                    <Items data={{ imagesData, items }} />
                </ConditionalWrapper>
                <div className={classes.orderTotalContainer}>
                    <ConditionalWrapper condition={hasTotals}>
                        <OrderTotal data={total} />
                    </ConditionalWrapper>
                </div>
            </div>
            <div className={classes.wrapBottom}>
                <div className={classes.shippingInformationContainer}>
                    <ConditionalWrapper condition={shipping_address}>
                        <ShippingInformation data={shipping_address} />
                    </ConditionalWrapper>
                </div>
                <div className={classes.shippingMethodContainer}>
                    <ConditionalWrapper condition={shipping_method}>
                        <ShippingMethod data={shippingMethodData} />
                    </ConditionalWrapper>
                </div>
                <div className={classes.billingInformationContainer}>
                    <ConditionalWrapper condition={billing_address}>
                        <BillingInformation data={billing_address} />
                    </ConditionalWrapper>
                </div>
                <div className={classes.paymentMethodContainer}>
                    <ConditionalWrapper
                        condition={payment_methods && payment_methods.length}
                    >
                        <PaymentMethod data={payment_methods} />
                    </ConditionalWrapper>
                </div>
            </div>
        </div>
    );
};

export default PrintOrder;
