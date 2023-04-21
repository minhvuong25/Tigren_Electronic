import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import { useIntl } from 'react-intl';

import DEFAULT_OPERATIONS from './sendMailToFriend.gql';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useAppContext } from '@magento/peregrine/lib/context/app';

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides
 * product sharing component logic.
 *
 *
 * @kind function
 *
 * @param {GraphqlQuery} props.sendEmailToFriendMutation
 * @param {object} props.product
 *
 * @return {{
 * invitee: number,
 * formType: string,
 * isLoading: boolean,
 * openCustomerPopup: boolean,
 * handleSubmit: func,
 * handleClosePopup: func
 * addNewInvitee: func
 * handleClosePopup: func
 * }}
 *
 * */

export const useShareProduct = props => {
    const { product } = props;
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const { sendEmailToFriendMutation } = operations;
    const [{ drawer }, { closeDrawer }] = useAppContext();
    const isOpen = drawer === 'email-to-friend';

    const { formatMessage } = useIntl();
    const [, { addToast }] = useToasts();

    const [sendEmailToFriend, { loading: isLoading }] = useMutation(
        sendEmailToFriendMutation
    );

    const handleClosePopup = useCallback(() => {
        closeDrawer();
    }, [closeDrawer]);

    const handleSubmit = useCallback(
        async values => {
            try {
                const payloadData = {
                    product_id: product.id,
                    sender: {
                        name: values.customer_name,
                        email: values.customer_email,
                        message: values.message
                    },
                    recipients: values.recipients
                };
                await sendEmailToFriend({
                    variables: { input: payloadData }
                });
                addToast({
                    type: 'info',
                    message: formatMessage({
                        id: 'shareProduct.success',
                        defaultMessage: 'The link to a friend was sent.'
                    }),
                    timeout: 7000
                });
                closeDrawer();
            } catch (error) {
                const message =
                    error.graphQLErrors &&
                    error.graphQLErrors[0] &&
                    error.graphQLErrors[0].message
                        ? error.graphQLErrors[0].message
                        : null;
                if (message) {
                    addToast({
                        type: 'error',
                        message: formatMessage({
                            id: 'global.error',
                            defaultMessage: message
                        }),
                        timeout: 7000
                    });
                }
            }
            closeDrawer();
        },
        [formatMessage, product.id, sendEmailToFriend, closeDrawer, addToast]
    );

    return {
        isLoading,
        handleSubmit,
        handleClosePopup,
        isOpen
    };
};
