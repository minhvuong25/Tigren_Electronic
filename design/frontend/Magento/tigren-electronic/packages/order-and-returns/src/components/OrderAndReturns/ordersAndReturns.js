import React, { Fragment } from 'react';
import { func } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import { validateEmail } from '@tigrensolutions/base/src/util/formValidators';
import combine from '@magento/venia-ui/lib/util/combineValidators';
import { useStyle } from '@magento/venia-ui/lib/classify';
import OrderDetail from '@tigrensolutions/order-and-returns/src/components/OrderDetails';
import Button from '@magento/venia-ui/lib/components/Button';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import Field from '@magento/venia-ui/lib/components/Field';
import Select from '@magento/venia-ui/lib/components/Select';
import { Form } from 'informed';
import defaultClasses from '@tigrensolutions/order-and-returns/src/components/OrderAndReturns/ordersAndReturns.module.css';
import { useOrdersAndReturns } from '@tigrensolutions/order-and-returns/src/talons/OrdersAndReturns';
import Breadcrumbs from '@magento/venia-ui/lib/components/Breadcrumbs';

const OrdersAndReturns = props => {
    const { formatMessage } = useIntl();
    const findOrderByOptions = [
        {
            value: '',
            label: formatMessage({
                id: 'global.selectType',
                defaultMessage: 'Please select Type'
            })
        },
        {
            value: 'email',
            label: formatMessage({
                id: 'global.email',
                defaultMessage: 'Email'
            })
        },
        {
            value: 'zip',
            label: formatMessage({
                id: 'global.postcodeLabel',
                defaultMessage: 'ZIP Code'
            })
        }
    ];
    const talonProps = useOrdersAndReturns();

    const {
        hideEmail,
        selectedType,
        isLoading,
        isPopupOrderDetailsOpen,
        initialValues,
        currentOrder,
        setFormApi,
        closePopupOrderDetail,
        changeFindOrderBy,
        handleSubmit
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const breadcrumbTitle = formatMessage({
        id: 'OrdersAndReturns.title',
        defaultMessage: 'Order Tracking'
    });

    if (isPopupOrderDetailsOpen) {
        return (
            <Fragment>
                <Breadcrumbs
                    staticPart={breadcrumbTitle}
                    data_active={'order-detail'}
                />
                <div className={classes.popupWrapper}>
                    <OrderDetail
                        currentOrder={currentOrder}
                        hasShipment={true}
                        closePopupOrderDetail={closePopupOrderDetail}
                    />
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Breadcrumbs staticPart={breadcrumbTitle} />
            <div className={classes.root}>
                <h1 className={classes.pageTitle}>
                    <FormattedMessage
                        id="ordersAndReturns.title"
                        defaultMessage="Orders and Returns"
                    />
                </h1>
                <p className={classes.subTitle}>
                    <FormattedMessage
                        id="ordersAndReturns.formTitle"
                        defaultMessage="Please enter your order information in the form below"
                    />
                </p>
                <Form onSubmit={handleSubmit}>
                    <div className={classes.formContent}>
                        <div className={classes.orderId}>
                            <Field
                                className={classes.orderField}
                                label={formatMessage({
                                    id: 'ordersAndReturns.orderID',
                                    defaultMessage: 'Order ID'
                                })}
                            >
                                <TextInput
                                    className={classes.textInput}
                                    id={classes.orderId}
                                    field="oar_order_id"
                                    validate={isRequired}
                                    validateOnBlur
                                />
                            </Field>
                        </div>
                        <div className={classes.findOrderBy}>
                            <Field
                                className={classes.orderField}
                                label={formatMessage({
                                    id: 'ordersAndReturns.findOrderBy',
                                    defaultMessage: 'Find Order By'
                                })}
                            >
                                <Select
                                    id={classes.findOrderBy}
                                    field="oar_type"
                                    items={findOrderByOptions}
                                    onChange={changeFindOrderBy}
                                    validate={isRequired}
                                    validateOnBlur
                                />
                            </Field>
                        </div>
                        {hideEmail || (
                            <div className={classes.email}>
                                <Field
                                    className={classes.orderField}
                                    label={formatMessage({
                                        id: 'global.email',
                                        defaultMessage: 'Email'
                                    })}
                                >
                                    <TextInput
                                        className={classes.textInput}
                                        id={classes.email}
                                        field="oar_email"
                                        validate={combine([
                                            isRequired,
                                            validateEmail
                                        ])}
                                        validateOnBlur
                                    />
                                </Field>
                            </div>
                        )}
                        {!hideEmail || (
                            <div className={classes.postcode}>
                                <Field
                                    className={classes.orderField}
                                    label={formatMessage({
                                        id: 'ordersAndReturns.billingZipCode',
                                        defaultMessage: 'Billing ZIP Code'
                                    })}
                                >
                                    <TextInput
                                        className={classes.textInput}
                                        id={classes.postcode}
                                        field="oar_zip"
                                        validate={isRequired}
                                        validateOnBlur
                                    />
                                </Field>
                            </div>
                        )}
                    </div>

                    <div className={classes.divButtonContinue}>
                        <Button
                            type="submit"
                            priority="high"
                            disabled={isLoading}
                        >
                            <FormattedMessage
                                id="ordersAndReturns.continue"
                                defaultMessage="Continue"
                            />
                        </Button>
                    </div>
                </Form>
            </div>
        </Fragment>
    );
};

OrdersAndReturns.defaultProps = {
    isLoading: false,
    selectedType: null,
    hideEmail: false,
    currentOrder: {}
};

OrdersAndReturns.propTypes = {
    handleSubmit: func
};

export default OrdersAndReturns;
