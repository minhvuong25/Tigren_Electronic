import React from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from '@tigrensolutions/order-and-returns/src/components/OrderDetails/orderShipment.module.css';

const OrderShipment = props => {
    const { shipments } = props;
    const classes = useStyle(defaultClasses, props.classes);
    let ContentElement;

    if (shipments.length) {
        ContentElement = shipments.map(shipment => {
            const { tracking: trackingCollection, items } = shipment;
            let trackingNumber;
            if (trackingCollection.length) {
                trackingNumber = trackingCollection.map(tracking => {
                    const { number } = tracking;
                    return (
                        <div className={classes.tracking}>
                            <span className={classes.trackingRow} key={number}>
                                <FormattedMessage
                                    id="orderDetails.trackingInformation"
                                    values={{
                                        number,
                                        strong: chunks => (
                                            <strong>{chunks}</strong>
                                        )
                                    }}
                                />
                            </span>
                        </div>
                    );
                });
            }
            let shipmentItems;
            if (items.length) {
                shipmentItems = items.map(item => {
                    const {
                        product_name,
                        product_sku,
                        quantity_shipped
                    } = item;
                    return (
                        <div className={classes.contentItem}>
                            <div className={classes.nameContainer}>
                                <span className={classes.labelMobile}>
                                    <FormattedMessage
                                        id="orderDetails.productName"
                                        defaultMessage="Product Name"
                                    />
                                    :
                                </span>
                                <div className={classes.contentMobile}>
                                    <div className={classes.name}>
                                        {product_name}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.sku}>
                                <span className={classes.labelMobile}>
                                    <FormattedMessage
                                        id="orderDetails.productSku"
                                        defaultMessage="SKU"
                                    />
                                    :
                                </span>
                                {product_sku}
                            </div>
                            <div className={classes.quantity}>
                                <span className={classes.labelMobile}>
                                    <FormattedMessage
                                        id="orderDetails.productQuantityShip"
                                        defaultMessage="Qty Shipped"
                                    />
                                    :
                                </span>
                                {quantity_shipped}
                            </div>
                        </div>
                    );
                });
            }
            return (
                <div className={classes.root}>
                    <div className={classes.heading}>
                        <FormattedMessage
                            id="orderDetails.shipmentLabel"
                            defaultMessage="Shipment"
                        />
                        <span className={classes.id}>#{shipment.number}</span>
                    </div>
                    <div className={classes.content}>
                        {trackingNumber}
                        <div className={classes.productShip}>
                            <div className={classes.headerTitle}>
                                <div className={classes.nameContainer}>
                                    <FormattedMessage
                                        id="orderDetails.productName"
                                        defaultMessage="Product Name"
                                    />
                                </div>
                                <div className={classes.sku}>
                                    <FormattedMessage
                                        id="orderDetails.productSku"
                                        defaultMessage="SKU"
                                    />
                                </div>
                                <div className={classes.quantity}>
                                    <FormattedMessage
                                        id="orderDetails.productQuantityShip"
                                        defaultMessage="Qty Shipped"
                                    />
                                </div>
                            </div>
                            {shipmentItems}
                        </div>
                    </div>
                </div>
            );
        });
    } else {
        ContentElement = '';
    }

    return ContentElement;
};

export default OrderShipment;

OrderShipment.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        method: string,
        tracking: string,
        trackingRow: string
    }),
    data: shape({
        shippingMethod: string,
        shipments: arrayOf(
            shape({
                id: string,
                tracking: arrayOf(
                    shape({
                        number: string
                    })
                )
            })
        )
    })
};
