import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
    mutation resetPassword(
        $token: String!
        $newPassword: String!
        $confirm: String!
        $customerId: Int
    ) {
        resetPassword_v2(
            resetPasswordToken: $token
            newPassword: $newPassword
            confirmPassword: $confirm
            customerId: $customerId
        ) @connection(key: "resetPassword")
    }
`;
export const VALIDATE_LINK_TOKEN_MUTATION = gql`
    mutation validateLinkToken($token: String!, $customerId: Int) {
        validateLinkToken(token: $token, customerId: $customerId)
            @connection(key: "validateLinkToken")
    }
`;

export default {
    queries: {},
    mutations: {
        resetPasswordMutation: RESET_PASSWORD_MUTATION,
        validateLinkTokenMutation: VALIDATE_LINK_TOKEN_MUTATION
    }
};
