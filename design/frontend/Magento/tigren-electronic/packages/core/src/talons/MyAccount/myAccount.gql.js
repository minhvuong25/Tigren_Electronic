import { gql } from '@apollo/client';

export const GET_CUSTOMER = gql`
    query getCustomer {
        customer {
            id
            email
            firstname
            lastname
            is_subscribed
            date_of_birth
            taxvat
            gender
            addresses {
                id
                customer_id
                region {
                    region_code
                    region
                    region_id
                }
                region_id
                country_id
                street
                company
                telephone
                fax
                postcode
                city
                firstname
                lastname
                middlename
                prefix
                suffix
                vat_id
                default_shipping
                default_billing
            }
        }
    }
`;

export default {
    getCustomer: GET_CUSTOMER
};
