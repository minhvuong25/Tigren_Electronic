import { useCallback } from 'react';
import { useAppContext } from '@magento/peregrine/lib/context/app';
import DEFAULT_OPERATIONS from './sendMailToFriend.gql';
import { useQuery } from '@apollo/client';

export const useShareProductButton = props => {
    const { storeConfigEmail } = DEFAULT_OPERATIONS;
    const [, { toggleDrawer }] = useAppContext();

    const { data, loading } = useQuery(storeConfigEmail, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });

    const isGuestSend = data?.storeConfig?.send_friend?.enabled_for_guests;
    const isCustomer = data?.storeConfig?.send_friend?.enabled_for_customers;
    const maxRecipients = data?.storeConfig?.sendfriend_email_max_recipients;

    const handleOpenPopup = useCallback(() => {
        toggleDrawer('email-to-friend');
    }, [toggleDrawer]);

    const handleLoginPopup = useCallback(() => {
        toggleDrawer('email-popup-login');
    }, [toggleDrawer]);

    return {
        handleOpenPopup,
        handleLoginPopup,
        isGuestSend,
        isCustomer,
        loading,
        maxRecipients
    };
};
