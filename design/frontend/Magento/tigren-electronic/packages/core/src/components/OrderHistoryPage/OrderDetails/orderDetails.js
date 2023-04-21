import React, { useRef } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ReactToPrint from 'react-to-print';

import { useStyle } from '@magento/venia-ui/lib/classify';
import ItemDetails from './itemDetails';
import OrderTotal from './orderTotal';
import Button from '@magento/venia-ui/lib/components/Button';
import defaultClasses from './orderDetails.module.css';
import { useHistory } from 'react-router-dom';
import PaymentMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/paymentMethod';
import ShippingMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingMethod';
import ShippingInformation from '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/shippingInformation';
import BillingInformation from '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails/billingInformation';
import PrintOrder from './PrintOrders/printOrder';

const ConditionalWrapper = props => (props.condition ? props.children : null);

const OrderDetails = props => {
    const { classes: propClasses, orderData, handleReorder, isBusy } = props;

    const {
        items,
        total,
        order_date: orderDate,
        status,
        shipments,
        state,
        payment_methods,
        shipping_address,
        shipping_method,
        billing_address
    } = orderData;

    const classes = useStyle(defaultClasses, propClasses);
    const history = useHistory();
    const printRef = useRef();

    const ORDER_STATUS = {
        canceled: classes.canceled,
        closed: classes.closed,
        complete: classes.complete,
        holded: classes.holded,
        payment_review: classes.payment_review,
        new: classes.new,
        pending_payment: classes.pending_payment,
        processing: classes.processing
    };
    let dateContent = '';
    if (orderDate) {
        const newDate = new Date(orderDate.toString().replace(/-/g, '/'));
        const monthNames = [
            {
                id: 'DateSelect.January',
                label: 'Jan',
                defaultMessage: 'Jan'
            },
            {
                id: 'DateSelect.February',
                label: 'Feb',
                defaultMessage: 'Feb'
            },
            {
                id: 'DateSelect.March',
                label: 'Mar',
                defaultMessage: 'Mar'
            },
            {
                id: 'DateSelect.April',
                label: 'Apr',
                defaultMessage: 'Apr'
            },
            {
                id: 'DateSelect.May',
                label: 'May',
                defaultMessage: 'May'
            },
            {
                id: 'DateSelect.June',
                label: 'Jun',
                defaultMessage: 'Jun'
            },
            {
                id: 'DateSelect.July',
                label: 'Jul',
                defaultMessage: 'Jul'
            },
            {
                id: 'DateSelect.August',
                label: 'Aug',
                defaultMessage: 'Aug'
            },
            {
                id: 'DateSelect.September',
                label: 'Sep',
                defaultMessage: 'Sep'
            },
            {
                id: 'DateSelect.October',
                label: 'Oct',
                defaultMessage: 'Oct'
            },
            {
                id: 'DateSelect.November',
                label: 'Nov',
                defaultMessage: 'Nov'
            },
            {
                id: 'DateSelect.December',
                label: 'Dec',
                defaultMessage: 'Dec'
            }
        ];
        const recheckDate = number => {
            if (number < 10) return `0${number}`;
            return number;
        };
        const month = newDate.getMonth();
        dateContent = (
            <div className={classes.date}>
                {recheckDate(newDate.getDate())}
                <span>
                    <FormattedMessage {...monthNames[month]} />
                </span>
                {recheckDate(newDate.getFullYear())}
            </div>
        );
    }
    const hasTotals = total.grand_total && total.grand_total.currency;

    const shippingMethodData = {
        shippingMethod: shipping_method,
        shipments
    };

    return (
        <div className={classes.root}>
            <div>
                <div className={classes.wrapTop}>
                    <div className={classes.detailTitle}>
                        <h2>
                            <FormattedMessage
                                defaultMessage={'Order Details'}
                                id={'orderHistoryPage.orderDetails'}
                            />
                        </h2>
                        <h6>{orderData.number}</h6>
                    </div>
                    <div
                        className={`${classes.orderStatusBadge} ${
                            ORDER_STATUS[state.toString().toLowerCase()]
                        }`}
                    >
                        {status}
                    </div>
                </div>
                <div className={classes.topContent}>
                    {dateContent}
                    <div className={classes.wrapPrint}>
                        <div>
                            <button
                                onClick={handleReorder}
                                disabled={isBusy}
                                className={classes.btnReorder}
                            >
                                <span className={classes.iconShop} />
                                <FormattedMessage
                                    id={'orderHistoryPage.reOrder'}
                                    defaultMessage={'Reorder'}
                                />
                            </button>
                        </div>
                        <div>
                            <ReactToPrint
                                trigger={() => (
                                    <Button className={classes.printButton}>
                                        <span className={classes.iconPrint} />
                                        <span className={classes.printLabel}>
                                            <FormattedMessage
                                                id="orderHistoryPage.printOrder"
                                                defaultMessage="Print Order"
                                            />
                                        </span>
                                    </Button>
                                )}
                                content={() => printRef.current}
                            />
                            <PrintOrder
                                printRef={printRef}
                                orderData={orderData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.itemsContainer}>
                    <ConditionalWrapper condition={items && items.length}>
                        <ItemDetails items={items} itemDefault={3} />
                    </ConditionalWrapper>
                </div>

                <div className={classes.orderTotalContainer}>
                    <ConditionalWrapper condition={hasTotals}>
                        <OrderTotal data={total} />
                    </ConditionalWrapper>
                </div>
            </div>
            <h5 className={classes.titleShip}>
                <FormattedMessage
                    id={'orderHistoryPage.orderDetail'}
                    defaultMessage={'Order Information'}
                />
            </h5>
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
            <button onClick={history.goBack} className={classes.goBackBtn}>
                <span className={classes.iconBack} />
                <FormattedMessage
                    id={'accountInformation.back'}
                    defaultMessage={'Go Back'}
                />
            </button>
        </div>
    );
};

export default OrderDetails;

OrderDetails.propTypes = {
    classes: shape({
        root: string,
        shippingInformationContainer: string,
        shippingMethodContainer: string,
        billingInformationContainer: string,
        paymentMethodContainer: string,
        itemsContainer: string,
        orderTotalContainer: string,
        printButton: string,
        printLabel: string
    }),
    imagesData: arrayOf(
        shape({
            id: number,
            sku: string,
            thumbnail: shape({
                url: string
            }),
            url_key: string,
            url_suffix: string
        })
    ),
    orderData: shape({
        billing_address: shape({
            city: string,
            country_code: string,
            firstname: string,
            lastname: string,
            postcode: string,
            region_id: string,
            street: arrayOf(string)
        }),
        items: arrayOf(
            shape({
                id: string,
                product_name: string,
                product_sale_price: shape({
                    currency: string,
                    value: number
                }),
                product_sku: string,
                selected_options: arrayOf(
                    shape({
                        label: string,
                        value: string
                    })
                ),
                quantity_ordered: number
            })
        ),
        payment_methods: arrayOf(
            shape({
                type: string,
                additional_data: arrayOf(
                    shape({
                        name: string,
                        value: string
                    })
                )
            })
        ),
        shipping_address: shape({
            city: string,
            country_code: string,
            firstname: string,
            lastname: string,
            postcode: string,
            region_id: string,
            street: arrayOf(string),
            telephone: string
        }),
        shipping_method: string,
        shipments: arrayOf(
            shape({
                id: string,
                tracking: arrayOf(
                    shape({
                        carrier: string,
                        number: string
                    })
                )
            })
        ),
        total: shape({
            discounts: arrayOf(
                shape({
                    amount: shape({
                        currency: string,
                        value: number
                    })
                })
            ),
            grand_total: shape({
                currency: string,
                value: number
            }),
            subtotal: shape({
                currency: string,
                value: number
            }),
            total_tax: shape({
                currency: string,
                value: number
            }),
            total_shipping: shape({
                currency: string,
                value: number
            })
        })
    })
};
