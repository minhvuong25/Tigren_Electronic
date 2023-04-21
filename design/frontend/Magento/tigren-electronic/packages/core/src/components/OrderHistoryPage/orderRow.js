import React from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import Price from '@magento/venia-ui/lib/components/Price';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './orderRow.module.css';
import { useHistory } from 'react-router-dom';

const OrderRow = props => {
    const history = useHistory();
    const { order } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const {
        invoices,
        number: orderNumber,
        order_date: orderDate,
        status,
        total,
        state,
        shipping_address
    } = order;
    const name = shipping_address
        ? shipping_address.firstname + ' ' + shipping_address.lastname
        : '';
    const { grand_total: grandTotal } = total;
    const { currency, value: orderTotal } = grandTotal;

    // Convert date to ISO-8601 format so Safari can also parse it
    const isoFormattedDate = orderDate.replace(' ', 'T');
    const formattedDate = new Date(isoFormattedDate).toLocaleDateString(
        'en-GB',
        {
            year: '2-digit',
            day: '2-digit',
            month: '2-digit'
        }
    );

    const orderTotalPrice =
        currency && orderTotal !== null ? (
            <Price currencyCode={currency} value={orderTotal} />
        ) : (
            '-'
        );

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

    return (
        <li className={classes.root}>
            <div className={classes.orderNumberContainer}>
                <span className={classes.orderNumberLabel}>
                    <FormattedMessage
                        id={'orderRow.orderNumberText'}
                        defaultMessage={'Order #'}
                    />
                </span>
                <span className={classes.orderNumber}>{orderNumber}</span>
            </div>
            <div className={classes.orderDateContainer}>
                <span className={classes.orderDateLabel}>
                    <FormattedMessage
                        id={'orderRow.orderDateText'}
                        defaultMessage={'Order Date'}
                    />
                </span>
                <span className={classes.orderDate}>{formattedDate}</span>
            </div>
            <div className={classes.orderTotalContainer}>
                <span className={classes.orderTotalLabel}>
                    <FormattedMessage
                        id={'orderHistoryPage.consignee'}
                        defaultMessage={'Consignee'}
                    />
                </span>
                <div className={classes.name}>{name}</div>
            </div>
            <div className={classes.orderTotalContainer}>
                <span className={classes.orderTotalLabel}>
                    <FormattedMessage
                        id={'orderRow.orderTotalText'}
                        defaultMessage={'Order Total'}
                    />
                </span>
                <div className={classes.orderTotal}>{orderTotalPrice}</div>
            </div>
            <div className={classes.statusContainer}>
                <span className={classes.orderTotalLabel}>
                    <FormattedMessage
                        id={'orderHistoryPage.status'}
                        defaultMessage={'Status'}
                    />
                </span>
                <div
                    className={`${classes.orderStatusBadge} ${
                        ORDER_STATUS[state.toString().toLowerCase()]
                    }`}
                >
                    <span>{status}</span>
                </div>
            </div>
            <div>
                <button
                    onClick={() =>
                        history.push(
                            `/sales/order/view/order_id/${order.number}`
                        )
                    }
                    className={classes.viewDetail}
                >
                    <FormattedMessage
                        id={'orderHistoryPage.viewDetail'}
                        defaultMessage={'View Details'}
                    />
                </button>
            </div>
        </li>
    );
};

export default OrderRow;

OrderRow.propTypes = {
    classes: shape({
        root: string,
        cell: string,
        stackedCell: string,
        label: string,
        value: string,
        orderNumberContainer: string,
        orderDateContainer: string,
        orderTotalContainer: string,
        orderStatusContainer: string,
        orderItemsContainer: string,
        contentToggleContainer: string,
        orderNumberLabel: string,
        orderDateLabel: string,
        orderTotalLabel: string,
        orderNumber: string,
        orderDate: string,
        orderTotal: string,
        orderStatusBadge: string,
        content: string,
        content_collapsed: string
    }),
    order: shape({
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
        invoices: arrayOf(
            shape({
                id: string
            })
        ),
        number: string,
        order_date: string,
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
                        number: string
                    })
                )
            })
        ),
        status: string,
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
