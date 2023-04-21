import { gql } from '@apollo/client';

import { CustomerAddressFragment } from '@magento/peregrine/lib/talons/CheckoutPage/AddressBook/addressBookFragments.gql';
import { PriceSummaryFragment } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/priceSummaryFragments.gql';
import { AvailablePaymentMethodsFragment } from '@magento/peregrine/lib/talons/CheckoutPage/PaymentInformation/paymentInformation.gql';

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddresses {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            addresses {
                id
                ...CustomerAddressFragment
                default_billing
            }
        }
    }
    ${CustomerAddressFragment}
`;

export const SET_BILLING_ADDRESS = gql`
    mutation setBillingAddress($cartId: String!, $customer_address_id: Int!) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: { customer_address_id: $customer_address_id }
            }
        ) {
            cart {
                id
                billing_address {
                    firstname
                    lastname
                    country {
                        code
                    }
                    street
                    city
                    region {
                        code
                    }
                    postcode
                    telephone
                }
                ...PriceSummaryFragment
                ...AvailablePaymentMethodsFragment
            }
        }
    }
    ${PriceSummaryFragment}
    ${AvailablePaymentMethodsFragment}
`;

export default {
    getCustomerAddressesQuery: GET_CUSTOMER_ADDRESSES,
    setBillingAddressMutationCustomer: SET_BILLING_ADDRESS
};
