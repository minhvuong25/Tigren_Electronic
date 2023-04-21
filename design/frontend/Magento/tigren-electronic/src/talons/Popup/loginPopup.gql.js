/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

import { gql } from '@apollo/client';

const CHECK_SIGNIN_POPUP = gql`
    mutation SignInPopup($email: String!, $password: String!) {
        checkLoginPopup(email: $email, password: $password) {
            status
        }
    }
`;

export const ENABLE_POPUP_LOGIN = gql`
    query displayPopup {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        displayPopup {
            status
        }
    }
`;
export const STORE_CONFIG_DATA = gql`
    query storeConfig {
        storeConfig {
            store_code
            passwordpopup
            userpopup
            enablepopup
        }
    }
`;
export default {
    storeConfig: STORE_CONFIG_DATA,
    checkSignin: CHECK_SIGNIN_POPUP,
    enablePopupLogin: ENABLE_POPUP_LOGIN
};
