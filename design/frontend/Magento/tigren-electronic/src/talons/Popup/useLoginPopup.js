/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import { useMutation, useQuery } from '@apollo/client';
import DEFAULT_OPERATIONS from './loginPopup.gql';
import React, { useCallback, useEffect, useState } from 'react';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import BrowserPersistence from '@magento/peregrine/lib/util/simplePersistence';

const storage = new BrowserPersistence();

export const useLoginPopup = props => {
    const operation = mergeOperations(DEFAULT_OPERATIONS);
    const { checkSignin, storeConfig } = operation;

    useEffect(() => {
        if (storage.getItem('isLoggedIn') !== false) {
            storage.setItem('isLoggedIn', true);
        }
    }, [storage]);

    const { data: statusPopup, loading: l } = useQuery(storeConfig, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
    });
    const statusPopupShow = statusPopup?.storeConfig?.enablepopup;
    const [Signin, { data: signin, loading }] = useMutation(checkSignin);
    const handleSubmit = useCallback(
        async formvalue => {
            const email = formvalue.target[0].value;
            const password = formvalue.target[1].value;
            formvalue.preventDefault();
            const res = await Signin({
                variables: {
                    email,
                    password
                }
            });

            const status = res.data.checkLoginPopup.status;
            if (status) {
                storage.setItem('isLoggedIn', false);
                props.closePopup();
            } else {
                props.signinFail();
            }
        },
        [Signin, storage]
    );
    // You are offline. Some features may be unavailable.

    return {
        statusPopupShow,
        handleSubmit
    };
};
