import { gql } from '@apollo/client';

export const GET_CUSTOMER_QUERY = gql`
    query getCustomer {
        customer {
            id
            email
            firstname
            lastname
            middlename
            is_subscribed
            phone_number
            date_of_birth
            gender
            addresses {
                id
                customer_id
                region {
                    region_code
                    region
                    region_id
                }
                street
                company
                telephone
                postcode
                city
                firstname
                lastname
                middlename
                country_code
                country_name
                default_shipping
                default_billing
            }
        }
    }
`;

export default {
    getCustomerQuery: GET_CUSTOMER_QUERY
};
