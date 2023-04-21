import React, { useMemo } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import PaymentMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/paymentMethod';
import ShippingMethod from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingMethod';
import ShippingInformation from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/shippingInformation';
import BillingInformation from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/billingInformation';
import CheckoutCreateAccount from '../../CheckoutCreateAccount';
import ItemDetails from './itemDetail';
import ShoppingSuccess from '../../../static/images/shopping-success.png';
import OrderTotal from '@magento/venia-ui/lib/components/OrderHistoryPage/OrderDetails/orderTotal';
import defaultClasses from './orderDetails.module.css';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { Link } from 'react-router-dom';

const ConditionalWrapper = props => (props.condition ? props.children : null);

const OrderDetails = props => {
    const { classes: propClasses, orderData } = props;
    const classes = useStyle(defaultClasses, propClasses);

    const [{ isSignedIn }] = useUserContext();
    const {
        billing_address,
        items,
        payment_methods,
        shipping_address,
        shipping_method,
        shipments,
        total,
        order_number: orderNumber,
        hasEmailAvailable,
        email
    } = orderData;

    const shippingMethodData = {
        shippingMethod: shipping_method,
        shipments
    };

    const orderUrl = isSignedIn ? `/order-history` : '/sign-in';
    const hasTotals = total.grand_total && total.grand_total.currency;

    const createAccountContent = useMemo(() => {
        return (
            <CheckoutCreateAccount
                firstname={shipping_address && shipping_address.firstname}
                lastname={shipping_address && shipping_address.lastname}
                email={email}
                orderNumber={orderNumber}
            />
        );
    }, [shipping_address, orderNumber, email, classes]);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <img src={ShoppingSuccess} alt="" />
                <h2 className={classes.title}>
                    <span>
                        <FormattedMessage
                            id={'CheckoutSuccess.title'}
                            defaultMessage={
                                'Your order has been successfully placed.'
                            }
                        />
                    </span>
                    <span>
                        <FormattedMessage
                            id={'CheckoutSuccess.thankYou'}
                            defaultMessage={'Thank you for your order'}
                        />
                    </span>
                </h2>
                <p>
                    <FormattedMessage
                        defaultMessage={'Your order id is'}
                        id={'CheckoutSuccess.order'}
                    />
                    {': '}
                    <Link to={orderUrl} className={classes.orderNumber}>
                        {`#${orderNumber}`}
                    </Link>
                </p>
                <p>
                    <FormattedMessage
                        defaultMessage={
                            'We will send your order details and order number to your email.'
                        }
                        id={'CheckoutSuccess.detail'}
                    />
                </p>
            </div>
            <div className={classes.title}>
                <h3 className={classes.heading}>
                    <FormattedMessage
                        id="CheckoutSuccess.orderInformation"
                        defaultMessage="Order Information"
                    />
                </h3>
            </div>
            <div className={classes.info}>
                <div className={classes.shippingInformationContainer}>
                    <ConditionalWrapper condition={shipping_address}>
                        <ShippingInformation data={shipping_address} />
                    </ConditionalWrapper>
                </div>
                <div className={classes.billingInformationContainer}>
                    <ConditionalWrapper condition={billing_address}>
                        <BillingInformation
                            data={billing_address}
                            isSuccess={true}
                        />
                    </ConditionalWrapper>
                </div>
                <div className={classes.shippingMethodContainer}>
                    <ConditionalWrapper condition={shipping_method}>
                        <ShippingMethod data={shippingMethodData} />
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
            <div className={classes.title}>
                <h3 className={classes.heading}>
                    <FormattedMessage
                        id="orderHistoryPage.orderedProduct"
                        defaultMessage="Ordered Products"
                    />
                </h3>
            </div>
            <div className={classes.table}>
                <div className={classes.itemsContainer}>
                    <ConditionalWrapper condition={items && items.length}>
                        <ItemDetails
                            items={items}
                            itemDefault={100}
                            isSuccess={true}
                        />
                    </ConditionalWrapper>
                </div>

                <div className={classes.orderTotalContainer}>
                    <ConditionalWrapper condition={hasTotals}>
                        <OrderTotal
                            data={total}
                            classes={{
                                root: classes.rootTotal,
                                heading: classes.headingTotal
                            }}
                        />
                    </ConditionalWrapper>
                </div>
            </div>
            {!isSignedIn && hasEmailAvailable && createAccountContent}
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
