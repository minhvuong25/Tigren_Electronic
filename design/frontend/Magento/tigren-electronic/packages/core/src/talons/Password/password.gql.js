/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */
import { gql } from '@apollo/client';

export const GET_STORE_CONFIG = gql`
    query getStoreConfigsData {
        storeConfig {
            store_code
            minimum_password_length
        }
    }
`;
export default {
    getStoreConfigQuery: GET_STORE_CONFIG
};
