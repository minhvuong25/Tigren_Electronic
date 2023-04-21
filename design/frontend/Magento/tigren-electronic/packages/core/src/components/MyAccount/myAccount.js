import React, { Fragment, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useMyAccount } from '@tigrensolutions/core/src/talons/MyAccount/useMyAccount';

import Tab from '@tigrensolutions/core/src/components/Tabs';
import Breadcrumbs from '@tigrensolutions/core/src/components/Breadcrumbs';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';

import AccountInformationPage from '@tigrensolutions/core/src/components/AccountInformationPage';
import OrderHistoryPage from '@tigrensolutions/core/src/components/OrderHistoryPage';
import OrderDetailsPage from '@tigrensolutions/core/src/components/OrderHistoryPage/OrderDetails';
import WishlistPage from '@tigrensolutions/core/src/components/WishlistPage';
import AddressBookPage from '@magento/venia-ui/lib/components/AddressBookPage';
import Dashboard from './Dashboard';
import SignOut from './SignOut';

import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './myAccount.module.css';

const MyAccountPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { formatMessage } = useIntl();

    const tabsDetails = [
        {
            path: '/customer/account',
            component: <Dashboard />,
            label: formatMessage({
                id: 'dashboard.myAccount',
                defaultMessage: 'My Account'
            })
        },
        {
            path: '/customer/account/edit',
            component: <AccountInformationPage />,
            label: formatMessage({
                id: 'dashboard.accountInformation',
                defaultMessage: 'Account Information'
            })
        },
        {
            path: '/customer/address',
            component: <AddressBookPage />,
            label: formatMessage({
                id: 'addressBookPage.addressBookText',
                defaultMessage: 'Address Book'
            })
        },
        {
            path: '/sales/order/history',
            related_path: '/sales/order/view/order_id',
            component: <OrderHistoryPage />,
            related_component: <OrderDetailsPage />,
            label: formatMessage({
                id: 'orderHistoryPage.pageTitleText',
                defaultMessage: 'My Orders'
            })
        },
        {
            path: '/wishlist',
            component: <WishlistPage />,
            label: formatMessage({
                id: 'accountSetting.wishList',
                defaultMessage: 'My Wish List'
            })
        },
        {
            path: '/customer/account/logout',
            component: <SignOut />,
            label: formatMessage({
                id: 'accountSetting.signOut',
                defaultMessage: 'Sign Out'
            })
        }
    ];

    tabsDetails.push();

    const {
        selectedTabIndex,
        relatedTabIndex,
        isSignedIn,
        currentUser,
        handleChangeTab
    } = useMyAccount({
        tabsDetails
    });

    const pageContent = useMemo(() => {
        if (!isSignedIn) {
            return null;
        }

        const selectedTab = tabsDetails.find(
            tab =>
                tab.path === location.pathname ||
                location.pathname.includes(tab.related_path)
        );

        if (selectedTab) {
            const breadcrumbTitle = selectedTab.label || '';

            return (
                <Fragment>
                    <div className={classes.root}>
                        <div className={`${classes.customerPages}`}>
                            <Breadcrumbs staticPart={breadcrumbTitle} />
                            <StoreTitle>{breadcrumbTitle}</StoreTitle>

                            <Tab
                                extendClass="customerTabClass"
                                currentUser={currentUser}
                                selectedTabIndex={selectedTabIndex}
                                changeTab={handleChangeTab}
                                tabsDetails={tabsDetails}
                            >
                                {tabsDetails.map((tabDetail, index) => {
                                    return (
                                        <div key={index} tabDetail={tabDetail}>
                                            {relatedTabIndex === index
                                                ? tabDetail.related_component
                                                : tabDetail.component}
                                        </div>
                                    );
                                })}
                            </Tab>
                        </div>
                    </div>
                </Fragment>
            );
        } else {
            return null;
        }
    }, [isSignedIn, currentUser, selectedTabIndex, relatedTabIndex]);

    return <div className={classes.root}>{pageContent}</div>;
};

export default MyAccountPage;
