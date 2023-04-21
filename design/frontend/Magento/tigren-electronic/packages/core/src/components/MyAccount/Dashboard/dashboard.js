import React, { useMemo, Fragment } from 'react';
import { shape, string } from 'prop-types';
import get from '@tigrensolutions/core/src/util/get';

import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

import { useDashboard } from '@tigrensolutions/core/src/talons/MyAccount/useDashboard';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Address from './address';
import DashboardShimmer from './dashboard.shimmer';

import defaultClasses from './dashboard.module.css';

const Dashboard = (props = {}) => {
    const talonProps = useDashboard();
    const classes = useStyle(defaultClasses, props.classes);

    const {
        customer,
        isLoading,
        defaultShippingAddress,
        defaultBillingAddress,
        handleChangePassword
    } = talonProps;

    const content = useMemo(() => {
        if (isLoading) return <DashboardShimmer />;

        return (
            <Fragment>
                <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <h3 className={classes.heading}>
                            <FormattedMessage
                                id="dashboard.contactInformation"
                                defaultMessage="Contact Information"
                            />
                        </h3>
                        <div className={classes.content}>
                            <div className={classes.information}>
                                <div className={classes.item}>
                                    <p className={classes.label}>
                                        <FormattedMessage
                                            id="dashboard.name"
                                            defaultMessage="Name"
                                        />
                                    </p>
                                    <p className={classes.value}>
                                        {get(customer, 'firstname', '')}{' '}
                                        {get(customer, 'lastname', '')}
                                    </p>
                                </div>

                                <div className={classes.item}>
                                    <p className={classes.label}>
                                        <FormattedMessage
                                            id="dashboard.email"
                                            defaultMessage="Email"
                                        />
                                    </p>
                                    <p className={classes.value}>
                                        {get(customer, 'email', '')}
                                    </p>
                                </div>

                                {customer?.phone_number && (
                                    <div className={classes.item}>
                                        <p className={classes.label}>
                                            <FormattedMessage
                                                id="dashboard.phone"
                                                defaultMessage="Phone"
                                            />
                                        </p>
                                        <p className={classes.value}>
                                            {get(customer, 'phone_number', '')}
                                        </p>
                                    </div>
                                )}

                                {customer?.gender && (
                                    <div className={classes.item}>
                                        <p className={classes.label}>
                                            <FormattedMessage
                                                id="dashboard.gender"
                                                defaultMessage="Gender"
                                            />
                                        </p>
                                        <p className={classes.value}>
                                            {get(customer, 'gender', 0) === 1 ? (
                                                <FormattedMessage
                                                    id="global.male"
                                                    defaultMessage="Male"
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    id="global.Female"
                                                    defaultMessage="Female"
                                                />
                                            )}
                                        </p>
                                    </div>
                                )}

                                {customer?.date_of_birth && (
                                    <div className={classes.item}>
                                        <p className={classes.label}>
                                            <FormattedMessage
                                                id="dashboard.birthday"
                                                defaultMessage="Birthday"
                                            />
                                        </p>
                                        <p className={classes.value}>
                                            {get(customer, 'date_of_birth', '')}
                                        </p>
                                    </div>
                                )}

                                <div className={classes.actions}>
                                    <Link
                                        to={'/customer/account/edit'}
                                        className={classes.edit}
                                    >
                                        <FormattedMessage
                                            id="global.edit"
                                            defaultMessage="Edit"
                                        />
                                    </Link>
                                    <LinkButton
                                        onClick={handleChangePassword}
                                        class={classes.changePassword}
                                    >
                                        <FormattedMessage
                                            id="dashboard.changePassword"
                                            defaultMessage="Change Password"
                                        />
                                    </LinkButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={classes.card}>
                        <h3 className={classes.heading}>
                            <FormattedMessage
                                id="dashboard.subscribe"
                                defaultMessage="Newsletters"
                            />
                        </h3>
                        <div className={classes.content}>
                            <p className={classes.subscribe}>
                                {get(customer, 'is_subscribed', false) ? (
                                    <FormattedMessage
                                        id="dashboard.subscribed"
                                        defaultMessage={`You are subscribed to "General Subscription".`}
                                    />
                                ) : (
                                    <FormattedMessage
                                        id="dashboard.unSubscribed"
                                        defaultMessage="You aren't subscribed to our newsletter."
                                    />
                                )}
                            </p>

                            <Link
                                to={'/customer/account/edit'}
                                className={classes.edit}
                            >
                                <FormattedMessage
                                    id="global.edit"
                                    defaultMessage="Edit"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={classes.groupTitle}>
                    <h3>
                        <FormattedMessage
                            id="dashboard.addressBook"
                            defaultMessage="Address Book"
                        />
                    </h3>

                    <Link to={'/customer/address'}>
                        <FormattedMessage
                            id="dashboard.editAddressBook"
                            defaultMessage="Manage Addresses"
                        />
                    </Link>
                </div>
                <div className={classes.cardContainer}>
                    <div className={classes.card}>
                        <h3 className={classes.heading}>
                            <FormattedMessage
                                id="dashboard.shippingAddress"
                                defaultMessage="Default Shipping Address"
                            />
                        </h3>
                        <div className={classes.content}>
                            <Address address={defaultShippingAddress} />
                        </div>
                    </div>

                    <div className={classes.card}>
                        <h3 className={classes.heading}>
                            <FormattedMessage
                                id="dashboard.defaultBilling"
                                defaultMessage="Default Billing Address"
                            />
                        </h3>
                        <div className={classes.content}>
                            <Address address={defaultBillingAddress} />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }, [
        customer,
        handleChangePassword,
        defaultShippingAddress,
        defaultBillingAddress,
        isLoading
    ]);

    return (
        <div className={classes.root}>
            <div className={classes.myAccountTitle}>
                <h3>
                    <FormattedMessage
                        id="dashboard.myAccount"
                        defaultMessage="My Account"
                    />
                </h3>
            </div>
            {content}
        </div>
    );
};

export default Dashboard;

Dashboard.propTypes = {
    classes: shape({
        root: string
    })
};

Dashboard.defaultProps = {};
