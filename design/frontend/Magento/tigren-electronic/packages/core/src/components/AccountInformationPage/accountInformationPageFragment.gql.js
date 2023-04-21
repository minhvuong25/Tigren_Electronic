import { gql } from '@apollo/client';

export const AccountInformationPageFragment = gql`
    fragment AccountInformationPageFragment on Customer {
        id
        firstname
        lastname
        email
        gender
        is_subscribed
        phone_number
        date_of_birth
    }
`;
