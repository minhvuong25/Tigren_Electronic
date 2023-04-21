import { gql } from '@apollo/client';

const SEND_EMAIL_TO_FRIEND = gql`
    mutation sendEmailToFriend($input: SendEmailToFriendInput!) {
        sendEmailToFriend(input: $input) {
            sender {
                name
                email
                message
            }
            recipients {
                name
                email
            }
        }
    }
`;

const STORE_CONFIG_SEND_EMAIL_TO_FRIEND = gql`
    query storeConfigData {
        storeConfig {
            store_code
            send_friend {
                enabled_for_customers
                enabled_for_guests
            }
            sendfriend_email_max_recipients
        }
    }
`;

export default {
    sendEmailToFriendMutation: SEND_EMAIL_TO_FRIEND,
    storeConfigEmail: STORE_CONFIG_SEND_EMAIL_TO_FRIEND
};
