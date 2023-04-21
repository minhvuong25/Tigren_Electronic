import { gql } from '@apollo/client';

const STORE_CONFIG = gql`
    query getStoreConfig {
        storeConfig {
            store_code
            store_name
            google_tag_manager_general_enabled
            google_tag_manager_general_enabled_ga4
        }
    }
`;

export default {
    getStoreConfigQuery: STORE_CONFIG
};
