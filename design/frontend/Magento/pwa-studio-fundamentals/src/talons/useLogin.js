/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import { BrowserPersistence } from '@magento/peregrine/lib/util';

const storage = new BrowserPersistence();
const unAuthPath = [
    'sign-in',
    'forgot-password',
    'create-account-be-customer',
    'create-account-non-customer',
    'customer/account/createPassword',
    'our-story',
    'terms-sale',
    'legal-note',
    'cookies-policy',
    'credits'
];

const unAuthPathForbidden = [
    '/sign-in',
    '/forgot-password',
    '/create-account-be-customer',
    '/create-account-non-customer',
    '/customer/account/createPassword'
];

const restrictedAuthPage = store => next => action => {
    const currentPath = window.location.pathname;

    let storeConfigRequiredLogin = storage.getItem('is_required_login');

    if (!storeConfigRequiredLogin) {
        return next(action);
    }

    const signin_token = storage.getItem('signin_token');

    if (signin_token === undefined) {
        let found = false;
        unAuthPath.forEach(function(value) {
            if (currentPath.indexOf(value) > -1) {
                found = true;
            }
        });

        if (!found) {
            history.pushState({}, '', '/sign-in');
            history.go(0);
        }
    } else {
        if (unAuthPathForbidden.includes(currentPath)) {
            history.pushState({}, '', '/');
            history.go(0);
        }
    }

    return next(action);
};
