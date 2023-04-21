import { gql } from '@apollo/client';

export const GET_STORE_CONFIG = gql`
    query getStoreConfigs {
        storeConfig {
            store_code
            allow_guest_checkout
        }
    }
`;

export const GET_COUNTRY_DEFAULT = gql`
    query getStoreConfigs {
        storeConfig {
            store_code
            general_country_default
        }
    }
`;

export const SET_PAYMENT_METHOD_ON_CART = gql`
    mutation setPaymentMethodOnCart(
        $cartId: String!
        $paymentMethodValue: String!
    ) {
        setPaymentMethodOnCart(
            input: {
                cart_id: $cartId
                payment_method: { code: $paymentMethodValue }
            }
        ) @connection(key: "setPaymentMethodOnCart") {
            cart {
                id
                selected_payment_method {
                    code
                    title
                }
            }
        }
    }
`;

export default {
    getStoreConfigQuery: GET_STORE_CONFIG,
    getCountryDefault: GET_COUNTRY_DEFAULT,
    setPaymentMethodOnCartMutation: SET_PAYMENT_METHOD_ON_CART
};
