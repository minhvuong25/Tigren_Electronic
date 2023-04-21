import { useCallback } from 'react';

/**
 * @param {Object}      props
 * @param {Function}    props.onSignOut - A function to call when sign out occurs.
 *
 * @returns {Object}    result
 * @returns {Function}  result.handleSignOut - The function to handle sign out actions.
 */
export const useAccountMenuItems = props => {
    const { onSignOut } = props;

    const handleSignOut = useCallback(() => {
        onSignOut();
    }, [onSignOut]);

    const MENU_ITEMS = [
        {
            name: 'My Account',
            id: 'dashboard.myAccount',
            url: '/customer/account'
        },
        {
            name: 'Account Information',
            id: 'dashboard.accountInformation',
            url: '/customer/account/edit'
        },
        {
            name: 'Address Book',
            id: 'addressBookPage.addressBookText',
            url: '/customer/address'
        },
        {
            name: 'My Orders',
            id: 'orderHistoryPage.pageTitleText',
            url: '/sales/order/history'
        },

        // Hide links until features are completed
        // {
        //     name: 'Store Credit & Gift Cards',
        //     id: 'accountMenu.storeCreditLink',
        //     url: ''
        // },
        {
            name: 'My Wish List',
            id: 'accountSetting.wishList',
            url: '/wishlist'
        },
        {
            name: 'My Product Reviews',
            id: 'accountSetting.myReview',
            url: '/review/customer'
        }
    ];

    return {
        handleSignOut,
        menuItems: MENU_ITEMS
    };
};
